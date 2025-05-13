import React, { useContext, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { EditorView } from 'prosemirror-view';
import { EditorState } from 'prosemirror-state';
import { StepMap } from 'prosemirror-transform';
import { WaxContext, ApplicationContext } from 'wax-prosemirror-core';

const EditorWrapper = styled.div`
  width: 100% !important;
  display: flex;
  flex-direction: row;
  > .ProseMirror {
    padding: 0px !important;
    box-shadow: none !important;
    width: 100% !important;
    &:focus {
      outline: none;
    }
    p {
      margin: 0;

      br {
        display: none;
      }
    }
  }
`;

const ContainerEditor = ({ node, view, getPos }) => {
  const editorRef = useRef();
  const { app } = useContext(ApplicationContext);
  const context = useContext(WaxContext);

  let containerView;
  const questionId = node?.attrs?.id;

  const filteredplugins = app.PmPlugins.getAll().filter(
    plugin =>
      !plugin.key.includes('y-sync') &&
      !plugin.key.includes('y-undo') &&
      !plugin.key.includes('yjs') &&
      !plugin.key.includes('comment'),
  );

  useEffect(() => {
    containerView = new EditorView(
      {
        mount: editorRef.current,
      },
      {
        editable: () => false,
        state: EditorState.create({
          doc: node,
          plugins: [...filteredplugins],
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
