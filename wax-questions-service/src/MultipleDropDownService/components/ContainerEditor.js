import React, { useContext, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { EditorView } from 'prosemirror-view';
import { EditorState, TextSelection, NodeSelection } from 'prosemirror-state';
import { StepMap } from 'prosemirror-transform';
import {
  splitListItem,
  liftListItem,
  sinkListItem,
} from 'prosemirror-schema-list';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap, chainCommands } from 'prosemirror-commands';
import { undo, redo } from 'prosemirror-history';
import {
  WaxContext,
  ApplicationContext,
  ComponentPlugin,
} from 'wax-prosemirror-core';
import FakeCursorPlugin from '../plugins/FakeCursorPlugin';

const EditorWrapper = styled.div`
  position: relative;
  height: 100%;

  > .ProseMirror {
    padding: 5px !important;
    &:focus {
      outline: none;
    }

    img[class='ProseMirror-separator'] {
      display: inline !important;
    }

    p.empty-node:first-child::before {
      content: attr(data-content);
    }

    .empty-node::before {
      color: rgb(170, 170, 170);
      float: left;
      font-style: italic;
      height: 0px;
      pointer-events: none;
    }
  }
`;

let WaxOverlays = () => true;

const ContainerEditor = ({ node, view, getPos }) => {
  const editorRef = useRef();

  const { app } = useContext(ApplicationContext);
  const context = useContext(WaxContext);
  const {
    pmViews: { main },
  } = context;

  let multipleDropDownContainerNodeView;
  const questionId = node.attrs.id;
  const isEditable = main.props.editable(editable => {
    return editable;
  });

  let finalPlugins = [FakeCursorPlugin()];

  const createKeyBindings = () => {
    const keys = getKeys();
    Object.keys(baseKeymap).forEach(key => {
      if (keys[key]) {
        keys[key] = chainCommands(keys[key], baseKeymap[key]);
      } else {
        keys[key] = baseKeymap[key];
      }
    });
    return keys;
  };

  const pressEnter = (state, dispatch) => {
    if (state.selection.node && state.selection.node.type.name === 'image') {
      const { $from, to } = state.selection;

      const same = $from.sharedDepth(to);

      const pos = $from.before(same);
      dispatch(state.tr.setSelection(NodeSelection.create(state.doc, pos)));
      return true;
    }
    // LISTS
    if (splitListItem(state.schema.nodes.list_item)(state)) {
      splitListItem(state.schema.nodes.list_item)(state, dispatch);
      return true;
    }

    return false;
  };

  const getKeys = () => {
    return {
      'Mod-z': () => undo(view.state, view.dispatch),
      'Mod-y': () => redo(view.state, view.dispatch),
      'Mod-[': liftListItem(view.state.schema.nodes.list_item),
      'Mod-]': sinkListItem(view.state.schema.nodes.list_item),
      //   Enter: () =>
      //     splitListItem(questionView.state.schema.nodes.list_item)(
      //       questionView.state,
      //       questionView.dispatch,
      //     ),
      Enter: pressEnter,
    };
  };

  const plugins = [keymap(createKeyBindings()), ...app.PmPlugins.getAll()];

  finalPlugins = finalPlugins.concat([...plugins]);
  useEffect(() => {
    WaxOverlays = ComponentPlugin('waxOverlays');

    multipleDropDownContainerNodeView = new EditorView(
      {
        mount: editorRef.current,
      },
      {
        editable: () => isEditable,
        state: EditorState.create({
          doc: node,
          plugins: finalPlugins,
        }),
        dispatchTransaction,
        disallowedTools: ['Images', 'FillTheGap', 'MultipleChoice'],
        type: 'MultipleDropDownContainer',
        handleDOMEvents: {
          mousedown: () => {
            main.dispatch(
              main.state.tr
                .setMeta('outsideView', questionId)
                .setSelection(
                  new TextSelection(
                    main.state.tr.doc.resolve(
                      getPos() + context.pmViews[questionId].state.selection.to,
                    ),
                  ),
                ),
            );
            context.updateView({}, questionId);
            if (multipleDropDownContainerNodeView.hasFocus())
              multipleDropDownContainerNodeView.focus();
          },
        },

        attributes: {
          spellcheck: 'false',
        },
      },
    );

    // Set Each note into Wax's Context
    context.updateView(
      {
        [questionId]: multipleDropDownContainerNodeView,
      },
      questionId,
    );
    multipleDropDownContainerNodeView.focus();
  }, []);

  const dispatchTransaction = tr => {
    const {
      state,
      transactions,
    } = multipleDropDownContainerNodeView.state.applyTransaction(tr);
    multipleDropDownContainerNodeView.updateState(state);
    context.updateView({}, questionId);

    if (!tr.getMeta('fromOutside')) {
      const outerTr = view.state.tr;
      const offsetMap = StepMap.offset(getPos() + 1);
      for (let i = 0; i < transactions.length; i++) {
        const { steps } = transactions[i];
        for (let j = 0; j < steps.length; j++)
          outerTr.step(steps[j].map(offsetMap));
      }
      if (outerTr.docChanged) {
        let history = true;
        if (tr.getMeta('reject')) history = false;

        view.dispatch(
          outerTr
            .setMeta('outsideView', questionId)
            .setMeta('addToHistory', history),
        );
      }
    }
  };

  return (
    <EditorWrapper>
      <div ref={editorRef} />
      <WaxOverlays activeViewId={questionId} group="questions" />
    </EditorWrapper>
  );
};

export default ContainerEditor;
