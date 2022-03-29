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

const EditorWrapper = styled.div`
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

const ContainerEditor = ({ node, view, getPos, isEditable, autoFocus }) => {
  const editorRef = useRef();

  const context = useContext(WaxContext);
  const { app } = context;

  let containerView;
  const questionId = node.attrs.id;

  useEffect(() => {
    containerView = new EditorView(
      {
        mount: editorRef.current,
      },
      {
        editable: () => false,
        state: EditorState.create({
          doc: node,
          plugins: [...app.getPlugins()],
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
      },
    );

    // Set Each note into Wax's Context
    context.updateView(
      {
        [questionId]: containerView,
      },
      questionId,
    );
  }, []);

  const dispatchTransaction = tr => {
    const { state, transactions } = containerView.state.applyTransaction(tr);
    containerView.updateState(state);
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

export default ContainerEditor;
