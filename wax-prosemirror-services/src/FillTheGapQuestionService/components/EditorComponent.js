/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */

import React, { useContext, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { EditorView } from 'prosemirror-view';
import { EditorState, TextSelection } from 'prosemirror-state';
import { StepMap } from 'prosemirror-transform';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap } from 'prosemirror-commands';
import { undo, redo } from 'prosemirror-history';
import { WaxContext } from 'wax-prosemirror-core';

const EditorWrapper = styled.span`
  display: inline-flex;

  > .ProseMirror {
    background: #a6a6a6 !important;
    border: 1px solid #a6a6a6;
    border-radius: 4px;
    box-shadow: none;
    color: #fff !important;
    display: inline;
    min-width: 50px;
    padding: 0px 2px 0px 2px !important;
    white-space: break-spaces;
    width: auto;
    word-wrap: break-word;

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

const EditorComponent = ({ node, view, getPos }) => {
  const editorRef = useRef();

  const context = useContext(WaxContext);
  let gapView;
  const questionId = node.attrs.id;
  const isEditable = context.view.main.props.editable(editable => {
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

  const plugins = [keymap(createKeyBindings()), ...context.app.getPlugins()];

  finalPlugins = finalPlugins.concat([...plugins]);

  const { activeViewId } = context;

  useEffect(() => {
    gapView = new EditorView(
      {
        mount: editorRef.current,
      },
      {
        editable: () => isEditable,
        state: EditorState.create({
          doc: node,
          plugins: finalPlugins,
        }),
        // This is the magic part
        dispatchTransaction,
        disallowedTools: ['Images', 'Lists', 'lift', 'Tables', 'FillTheGap'],
        handleDOMEvents: {
          mousedown: () => {
            context.view[activeViewId].dispatch(
              context.view[activeViewId].state.tr.setSelection(
                TextSelection.between(
                  context.view[activeViewId].state.selection.$anchor,
                  context.view[activeViewId].state.selection.$head,
                ),
              ),
            );
            context.updateView({}, questionId);
            // Kludge to prevent issues due to the fact that the whole
            // footnote is node-selected (and thus DOM-selected) when
            // the parent editor is focused.
            if (gapView.hasFocus()) gapView.focus();
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
        [questionId]: gapView,
      },
      questionId,
    );
    gapView.focus();
  }, []);

  const dispatchTransaction = tr => {
    const { state, transactions } = gapView.state.applyTransaction(tr);
    gapView.updateState(state);
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
        view.dispatch(outerTr.setMeta('outsideView', questionId));
    }
  };

  return (
    <EditorWrapper>
      <div ref={editorRef} />
    </EditorWrapper>
  );
};

export default EditorComponent;
