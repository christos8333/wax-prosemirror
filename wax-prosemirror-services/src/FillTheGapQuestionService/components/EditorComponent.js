import React, { useContext, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { EditorView } from 'prosemirror-view';
import { EditorState, TextSelection } from 'prosemirror-state';
import { StepMap } from 'prosemirror-transform';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap } from 'prosemirror-commands';
import { undo, redo } from 'prosemirror-history';
import { WaxContext } from 'wax-prosemirror-core';
import InputComponent from './InputComponent';

const EditorWrapper = styled.span`
  display: inline-flex;

  > .ProseMirror {
    border-bottom: 1px solid #a6a6a6 !important;
    border-radius: 4px;
    box-shadow: none;
    color: #008000;
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

const StudentAnswer = styled.span`
  border-bottom: 1px solid black;
  margin-right: 5px;
  color: ${props => (props.isCorrect ? ' #008000' : 'red')};
`;

const CorrectAnswers = styled.span`
  border-bottom: 1px solid green;
  margin-right: 5px;
`;

const EditorComponent = ({ node, view, getPos }) => {
  const editorRef = useRef();

  const context = useContext(WaxContext);
  const {
    app,
    pmViews: { main },
  } = context;

  const { testMode, showFeedBack } = main.props.customValues;

  let gapView;
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

        dispatchTransaction,
        disallowedTools: [
          'Images',
          'Lists',
          'lift',
          'Tables',
          'FillTheGap',
          'Gap',
          'MultipleChoice',
          'Essay',
        ],
        handleDOMEvents: {
          mousedown: () => {
            main.dispatch(
              main.state.tr
                .setMeta('outsideView', questionId)
                .setSelection(
                  new TextSelection(
                    main.state.tr.doc.resolve(
                      getPos() +
                        2 +
                        context.pmViews[questionId].state.selection.to,
                    ),
                  ),
                ),
            );
            context.updateView({}, questionId);

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
      for (let i = 0; i < transactions.length; i += 1) {
        const { steps } = transactions[i];
        for (let j = 0; j < steps.length; j += 1)
          outerTr.step(steps[j].map(offsetMap));
      }
      if (outerTr.docChanged)
        view.dispatch(outerTr.setMeta('outsideView', questionId));
    }
  };

  let isCorrect = false;
  if (
    node.textContent
      .split(';')
      .find(element => element === node.attrs.answer.trim())
  ) {
    isCorrect = true;
  }

  return (
    (isEditable && !testMode && !showFeedBack && (
      <EditorWrapper>
        <div ref={editorRef} />
      </EditorWrapper>
    )) ||
    (!isEditable && !testMode && !showFeedBack && (
      <EditorWrapper>
        <div ref={editorRef} />
      </EditorWrapper>
    )) ||
    (showFeedBack && !testMode && (
      <>
        <StudentAnswer isCorrect={isCorrect}>{node.attrs.answer}</StudentAnswer>
        <CorrectAnswers>{`(Aceepted Answers : ${node.textContent.replaceAll(';', ' -')})`}</CorrectAnswers>
      </>
    )) || <InputComponent getPos={getPos} node={node} view={view} />
  );
};

export default EditorComponent;
