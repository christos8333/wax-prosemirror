/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import { TextSelection } from 'prosemirror-state';
import { WaxContext } from 'wax-prosemirror-core';
import { PlusSquareOutlined, DeleteOutlined } from '@ant-design/icons';
import { Fragment } from 'prosemirror-model';
import { v4 as uuidv4 } from 'uuid';
import helpers from '../helpers/helpers';
import EditorComponent from './EditorComponent';
import SwitchComponent from './SwitchComponent';
import Button from './Button';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InfoRow = styled.div`
  color: black;
  display: flex;
  flex-direction: row;
  padding: 10px 0px 4px 0px;
`;

const QuestionNunber = styled.span`
  &:before {
    content: 'Answer ' counter(question-item-multiple);
    counter-increment: question-item-multiple;
  }
`;

const QuestionControlsWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const QuestionWrapper = styled.div`
  border: 1px solid #a5a1a2;
  border-radius: 4px;
  color: black;
  display: flex;
  flex: 2 1 auto;
  flex-direction: column;
  padding: 10px;
`;

const IconsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  button {
    border: none;
  }

  span {
    cursor: pointer;
  }
`;

const QuestionData = styled.div`
  align-items: normal;
  display: flex;
  flex-direction: row;
`;

const FeedBack = styled.div`
  color: black;
  margin-top: 10px;
`;

const FeedBackLabel = styled.span`
  font-weight: 700;
`;

const FeedBackInput = styled.input`
  border: none;
  display: flex;
  width: 100%;
`;

export default ({ node, view, getPos }) => {
  const context = useContext(WaxContext);
  const {
    view: { main },
    activeViewId,
  } = context;

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  const [feadBack, setFeedBack] = useState(node.attrs.feedback);

  const feedBackRef = useRef(null);

  const feedBackInput = () => {
    setFeedBack(feedBackRef.current.value);
  };

  const handleKeyDown = e => {
    e.stopPropagation();
    if (e.key === 'Backspace') {
      context.view.main.dispatch(
        context.view.main.state.tr.setSelection(
          new TextSelection(context.view.main.state.tr.doc.resolve(0)),
        ),
      );
    }
  };

  const removeOption = () => {
    main.state.doc.nodesBetween(getPos(), getPos() + 1, (nodes, pos) => {
      if (nodes.attrs.id === node.attrs.id) {
        main.dispatch(
          main.state.tr.deleteRange(getPos(), getPos() + nodes.nodeSize + 1),
        );
      }
    });
  };

  const addOption = nodeId => {
    const newAnswerId = uuidv4();
    context.view.main.state.doc.descendants((editorNode, index) => {
      if (editorNode.type.name === 'multiple_choice') {
        if (editorNode.attrs.id === nodeId) {
          context.view.main.dispatch(
            context.view.main.state.tr.setSelection(
              new TextSelection(
                context.view.main.state.tr.doc.resolve(
                  editorNode.nodeSize + index,
                ),
              ),
            ),
          );

          const answerOption = context.view.main.state.config.schema.nodes.multiple_choice.create(
            { id: newAnswerId },
            Fragment.empty,
          );
          context.view.main.dispatch(
            context.view.main.state.tr.replaceSelectionWith(answerOption),
          );
          // create Empty Paragraph
          setTimeout(() => {
            helpers.createEmptyParagraph(context, newAnswerId);
          }, 100);
        }
      }
    });
  };

  const saveFeedBack = () => {
    const sel = context.view[activeViewId].state.selection;
    console.log(sel);
    setTimeout(() => {
      context.view.main.dispatch(
        context.view.main.state.tr.setNodeMarkup(getPos(), undefined, {
          ...node.attrs,
          feedback: feadBack,
        }),
      );
    }, 150);
    setTimeout(() => {
      context.view[activeViewId].dispatch(
        context.view[activeViewId].state.tr.setSelection(
          TextSelection.between(
            context.view[activeViewId].state.selection.$anchor,
            context.view[activeViewId].state.selection.$head,
          ),
        ),
      );
      context.view[activeViewId].focus();
    }, 200);
  };

  const onFocus = () => {
    context.view.main.dispatch(
      context.view.main.state.tr.setSelection(
        new TextSelection(context.view.main.state.tr.doc.resolve(0)),
      ),
    );
  };

  const readOnly = !isEditable;
  const showAddIcon = true;
  const showRemoveIcon = true;

  return (
    <Wrapper>
      <InfoRow>
        <QuestionNunber></QuestionNunber>
      </InfoRow>
      <QuestionControlsWrapper>
        <QuestionWrapper>
          <QuestionData>
            <EditorComponent node={node} view={view} getPos={getPos} />

            <SwitchComponent />
          </QuestionData>
          <FeedBack>
            <FeedBackLabel>Feedback</FeedBackLabel>
            <FeedBackInput
              onKeyDown={handleKeyDown}
              onChange={feedBackInput}
              placeholder="Insert feedback"
              ref={feedBackRef}
              type="text"
              value={feadBack}
              onBlur={saveFeedBack}
              onFocus={onFocus}
            />
          </FeedBack>
        </QuestionWrapper>
        <IconsWrapper>
          {showAddIcon && !readOnly && (
            <Button
              onClick={() => addOption(node.attrs.id)}
              icon={<PlusSquareOutlined title="Add Option" />}
            />
          )}
          {showRemoveIcon && !readOnly && (
            <Button
              icon={
                <DeleteOutlined onClick={removeOption} title="Delete Option" />
              }
            />
          )}
        </IconsWrapper>
      </QuestionControlsWrapper>
    </Wrapper>
  );
};
