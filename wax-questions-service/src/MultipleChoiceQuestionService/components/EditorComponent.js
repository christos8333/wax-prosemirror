/* eslint-disable no-plusplus */
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
import {
  WaxContext,
  ApplicationContext,
  ComponentPlugin,
  DocumentHelpers,
  Icon,
} from 'wax-prosemirror-core';
import {
  splitListItem,
  liftListItem,
  sinkListItem,
} from 'prosemirror-schema-list';
import Placeholder from '../plugins/placeholder';
import FakeCursorPlugin from '../../MultipleDropDownService/plugins/FakeCursorPlugin';

const DeleteArea = styled.div`
  border-bottom: 3px solid #f5f5f7;
  height: 30px;
`;

const EditorWrapper = styled.div`
  border: none;
  display: flex;
  flex: 2 1 auto;
  justify-content: left;
  padding: ${props => (props.usePadding ? '0px 20px 10px 20px' : `0px`)};
  width: 100%;

  .ProseMirror {
    white-space: break-spaces;
    width: 100%;
    word-wrap: break-word;

    &:focus {
      outline: none;
    }

    :empty::before {
      color: #aaa;
      content: 'Type your item';
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

const ActionButton = styled.button`
  background: transparent;
  border: none;
  bottom: 14px;
  cursor: pointer;
  float: right;
  margin-top: 16px;
  position: relative;
`;

const StyledIconActionRemove = styled(Icon)`
  height: 24px;
  width: 24px;
`;

let WaxOverlays = () => true;

const QuestionEditorComponent = ({
  node,
  view,
  getPos,
  placeholderText = 'Type your item',
  QuestionType = 'Multiple',
  forceEditable = false,
  showDelete = false,
}) => {
  const editorRef = useRef();
  const { app } = useContext(ApplicationContext);
  const context = useContext(WaxContext);
  const {
    pmViews: { main },
  } = context;

  let questionView;
  const questionId = node.attrs.id;
  let isEditable = main.props.editable(editable => {
    return editable;
  });
  if (forceEditable) isEditable = true;

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
      'Mod-z': () => undo(main.state, main.dispatch),
      'Mod-y': () => redo(main.state, main.dispatch),
      'Mod-[': liftListItem(view.state.schema.nodes.list_item),
      'Mod-]': sinkListItem(view.state.schema.nodes.list_item),
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
        type: QuestionType,
        scrollMargin: 200,
        scrollThreshold: 200,
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
    const addToHistory = !tr.getMeta('exludeToHistoryFromOutside');
    const { state, transactions } = questionView.state.applyTransaction(tr);
    questionView.updateState(state);
    context.updateView({}, questionId);

    // setTimeout(() => {
    //   context.updateView({}, questionId);
    // });

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

  const removeQuestion = () => {
    const allNodes = getNodes(context.pmViews.main);

    allNodes.forEach(singleNode => {
      context.pmViews.main.dispatch(
        context.pmViews.main.state.tr.delete(
          singleNode.pos,
          singleNode.pos + singleNode.node.nodeSize,
        ),
      );
    });
  };

  return (
    <>
      {showDelete && (
        <DeleteArea>
          <ActionButton
            aria-label="delete this question"
            onClick={removeQuestion}
            type="button"
          >
            <StyledIconActionRemove name="deleteOutlinedQuestion" />
          </ActionButton>
        </DeleteArea>
      )}
      <EditorWrapper
        usePadding={showDelete && QuestionType !== 'EssayQuestion'}
      >
        <div ref={editorRef} />
        <WaxOverlays activeViewId={questionId} />
      </EditorWrapper>
    </>
  );
};

export default QuestionEditorComponent;

const getNodes = view => {
  const allNodes = DocumentHelpers.findBlockNodes(view.state.doc);
  const fillTheGapContainerNodes = [];
  allNodes.forEach(node => {
    if (
      node.node.type.name === 'multiple_choice_container' ||
      node.node.type.name === 'multiple_choice_single_correct_container' ||
      node.node.type.name === 'true_false_container' ||
      node.node.type.name === 'true_false_single_correct_container' ||
      node.node.type.name === 'essay_container'
    ) {
      fillTheGapContainerNodes.push(node);
    }
  });
  return fillTheGapContainerNodes;
};
