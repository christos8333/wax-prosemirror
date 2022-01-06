/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */

import React, { useContext, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { EditorView } from 'prosemirror-view';
import { EditorState, TextSelection, NodeSelection } from 'prosemirror-state';
import { StepMap } from 'prosemirror-transform';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap, chainCommands } from 'prosemirror-commands';
import { undo, redo } from 'prosemirror-history';
import { WaxContext } from 'wax-prosemirror-core';
import {
  splitListItem,
  liftListItem,
  sinkListItem,
} from 'prosemirror-schema-list';
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
const QuestionEditorComponent = ({ node, view, getPos }) => {
  const editorRef = useRef();

  const context = useContext(WaxContext);
  let questionView;
  const questionId = node.attrs.id;
  const isEditable = context.view.main.props.editable(editable => {
    return editable;
  });

  let finalPlugins = [];

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

  const plugins = [keymap(createKeyBindings()), ...context.app.getPlugins()];

  // eslint-disable-next-line no-shadow
  const createPlaceholder = placeholder => {
    return Placeholder({
      content: placeholder,
    });
  };

  finalPlugins = finalPlugins.concat([
    createPlaceholder('Type your question'),
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
        // This is the magic part
        dispatchTransaction,
        disallowedTools: ['MultipleChoice'],
        handleDOMEvents: {
          mousedown: () => {
            context.updateView({}, questionId);
            context.view.main.dispatch(
              context.view.main.state.tr
                .setMeta('outsideView', questionId)
                .setSelection(
                  new TextSelection(
                    context.view.main.state.tr.doc.resolve(
                      getPos() +
                        2 +
                        context.view[questionId].state.selection.to,
                    ),
                  ),
                ),
            );
            context.updateView({}, questionId);

            // Kludge to prevent issues due to the fact that the whole
            // footnote is node-selected (and thus DOM-selected) when
            // the parent editor is focused.
            if (questionView.hasFocus()) questionView.focus();
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
    const outerTr = context.view.main.state.tr;
    context.view.main.dispatch(outerTr.setMeta('outsideView', questionId));
    const { state, transactions } = questionView.state.applyTransaction(tr);
    context.updateView({}, questionId);
    questionView.updateState(state);
    if (!tr.getMeta('fromOutside')) {
      const offsetMap = StepMap.offset(getPos() + 1);
      for (let i = 0; i < transactions.length; i++) {
        const { steps } = transactions[i];
        for (let j = 0; j < steps.length; j++)
          if (steps[j].map(offsetMap) !== null)
            if (steps[j].map(offsetMap) !== null)
              outerTr.step(steps[j].map(offsetMap));
      }
      if (outerTr.docChanged)
        context.view.main.dispatch(outerTr.setMeta('outsideView', questionId));
    }
  };

  return (
    <EditorWrapper>
      <div ref={editorRef} />
    </EditorWrapper>
  );
};

export default QuestionEditorComponent;
