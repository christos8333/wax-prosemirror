/* eslint-disable react/prop-types */
import React, { useContext, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { EditorView } from 'prosemirror-view';
import { EditorState, TextSelection, NodeSelection } from 'prosemirror-state';
import { dropCursor } from 'prosemirror-dropcursor';
import { gapCursor } from 'prosemirror-gapcursor';
import { StepMap } from 'prosemirror-transform';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap, chainCommands } from 'prosemirror-commands';
import { undo, redo } from 'prosemirror-history';
import { WaxContext, ComponentPlugin } from 'wax-prosemirror-core';
import {
  splitListItem,
  liftListItem,
  sinkListItem,
} from 'prosemirror-schema-list';
import Placeholder from '../plugins/placeholder';
import FakeCursorPlugin from '../../MultipleDropDownService/plugins/FakeCursorPlugin';

const EditorWrapper = styled.div`
  border: none;
  display: flex;
  flex: 2 1 auto;
  width: 100%;
  justify-content: left;

  .ProseMirror {
    white-space: break-spaces;
    width: 100%;
    word-wrap: break-word;

    &:focus {
      outline: none;
    }

    :empty::before {
      content: 'Type your item';
      color: #aaa;
      float: left;
      font-style: italic;
      pointer-events: none;
    }

    p:first-child {
      margin: 0;
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

const QuestionEditorComponent = ({
  node,
  view,
  getPos,
  placeholderText = 'Type your item',
}) => {
  const editorRef = useRef();

  const context = useContext(WaxContext);
  const {
    app,
    pmViews: { main },
  } = context;
  let questionView;
  const questionId = node.attrs.id;
  const isEditable = main.props.editable(editable => {
    return editable;
  });

  let finalPlugins = [FakeCursorPlugin(), gapCursor(), dropCursor()];

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

  const plugins = [keymap(createKeyBindings()), ...app.getPlugins()];

  const createPlaceholder = placeholder => {
    return Placeholder({
      content: placeholder,
    });
  };

  finalPlugins = finalPlugins.concat([
    createPlaceholder(placeholderText),
    ...plugins,
  ]);

  useEffect(() => {
    WaxOverlays = ComponentPlugin('waxOverlays');
    questionView = new EditorView(
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
        disallowedTools: ['MultipleChoice'],
        handleDOMEvents: {
          mousedown: () => {
            context.updateView({}, questionId);
            main.dispatch(
              main.state.tr
                .setMeta('outsideView', questionId)
                .setSelection(
                  new TextSelection(
                    main.state.tr.doc.resolve(
                      getPos() +
                        1 +
                        context.pmViews[questionId].state.selection.to,
                    ),
                  ),
                ),
            );
            // context.pmViews[activeViewId].dispatch(
            //   context.pmViews[activeViewId].state.tr.setSelection(
            //     TextSelection.between(
            //       context.pmViews[activeViewId].state.selection.$anchor,
            //       context.pmViews[activeViewId].state.selection.$head,
            //     ),
            //   ),
            // );

            context.updateView({}, questionId);

            if (questionView.hasFocus()) questionView.focus();
          },
          blur: (editorView, event) => {
            if (questionView && event.relatedTarget === null) {
              questionView.focus();
            }
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
        [questionId]: questionView,
      },
      questionId,
    );
    if (questionView.hasFocus()) questionView.focus();
  }, []);

  const dispatchTransaction = tr => {
    console.log(tr.getMeta('addToHistoryFromOutside'));
    const addToHistory = !tr.getMeta('exludeToHistoryFromOutside');
    const { state, transactions } = questionView.state.applyTransaction(tr);
    questionView.updateState(state);
    context.updateView({}, questionId);

    if (!tr.getMeta('fromOutside')) {
      const outerTr = view.state.tr;
      const offsetMap = StepMap.offset(getPos() + 1);
      for (let i = 0; i < transactions.length; i++) {
        const { steps } = transactions[i];
        for (let j = 0; j < steps.length; j++)
          outerTr.step(steps[j].map(offsetMap));
      }
      if (outerTr.docChanged)
        view.dispatch(
          outerTr
            .setMeta('outsideView', questionId)
            .setMeta('addToHistory', addToHistory),
        );
    }
  };

  return (
    <EditorWrapper>
      <div ref={editorRef} />
      <WaxOverlays activeViewId={questionId} />
    </EditorWrapper>
  );
};

export default QuestionEditorComponent;
