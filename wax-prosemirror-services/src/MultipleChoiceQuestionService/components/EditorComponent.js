import React, { useContext, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { EditorView } from 'prosemirror-view';
import { EditorState, TextSelection } from 'prosemirror-state';
import { StepMap } from 'prosemirror-transform';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap } from 'prosemirror-commands';
import { undo, redo } from 'prosemirror-history';
import { WaxContext } from 'wax-prosemirror-core';
import Placeholder from '../plugins/placeholder';

const EditorWrapper = styled.div`
  border: none;
  display: flex;
  flex: 2 1 auto;
  justify-content: left;

  .ProseMirror {
    white-space: break-spaces;
    width: 100%;
    word-wrap: break-word;

    &:focus {
      outline: none;
    }

    :empty::before {
      content: 'Type your answer';
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

const EditorComponent = ({ node, view, getPos }) => {
  const editorRef = useRef();

  const context = useContext(WaxContext);
  const {
    app,
    pmViews: { main },
    activeViewId,
  } = context;
  let questionView;
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

  // eslint-disable-next-line no-shadow
  const createPlaceholder = placeholder => {
    return Placeholder({
      content: placeholder,
    });
  };

  finalPlugins = finalPlugins.concat([
    createPlaceholder('Type your answer'),
    ...plugins,
  ]);

  useEffect(() => {
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
        disallowedTools: ['Images', 'Lists', 'lift', 'MultipleChoice'],
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
