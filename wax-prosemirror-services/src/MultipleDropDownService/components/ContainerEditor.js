/* eslint-disable react/prop-types */

import React, { useContext, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { EditorView } from 'prosemirror-view';
import { EditorState, TextSelection } from 'prosemirror-state';
import { StepMap } from 'prosemirror-transform';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap } from 'prosemirror-commands';
import { undo, redo } from 'prosemirror-history';
import { WaxContext, ComponentPlugin } from 'wax-prosemirror-core';

const EditorWrapper = styled.div`
  position: relative;

  > .ProseMirror {
    padding: 5px;
    &:focus {
      outline: none;
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

  const context = useContext(WaxContext);
  const {
    app,
    pmViews: { main },
  } = context;

  let multipleDropDownContainerNodeView;
  const questionId = node.attrs.id;
  const isEditable = main.props.editable(editable => {
    return editable;
  });

  let finalPlugins = [];

  const createKeyBindings = () => {
    const keys = getKeys();
    Object.keys(baseKeymap).forEach(key => {
      keys[key] = baseKeymap[key];
    });
    return keys;
  };

  const getKeys = () => {
    return {
      'Mod-z': () => undo(view.state, view.dispatch),
      'Mod-y': () => redo(view.state, view.dispatch),
    };
  };

  const plugins = [keymap(createKeyBindings()), ...app.getPlugins()];

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
        disallowedTools: [
          'Images',
          'Lists',
          'lift',
          'Tables',
          'FillTheGap',
          'MultipleChoice',
        ],
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
      if (outerTr.docChanged && !tr.getMeta('reject')) {
        view.dispatch(outerTr.setMeta('outsideView', questionId));
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
