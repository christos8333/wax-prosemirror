/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import { TextSelection } from 'prosemirror-state';
import { WaxContext } from 'wax-prosemirror-core';
import { PlusSquareOutlined, DeleteOutlined } from '@ant-design/icons';
import { Fragment } from 'prosemirror-model';
import { v4 as uuidv4 } from 'uuid';

import EditorComponent from './EditorComponent';
import FeedbackComponent from './FeedbackComponent';
import SwitchComponent from './SwitchComponent';
import Button from './Button';
import { nodes } from 'prosemirror-schema-basic';

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

const QuestionNunber = styled.span``;

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
  } = context;

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  const [feadBack, setFeedBack] = useState('');

  const feedBackRef = useRef(null);

  const feedBackInput = () => {
    setFeedBack(feedBackRef.current.value);
  };

  const handleKeyDown = e => {
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
            if (context.view[newAnswerId]) {
              context.view[newAnswerId].dispatch(
                context.view[newAnswerId].state.tr.setSelection(
                  TextSelection.between(
                    context.view[newAnswerId].state.selection.$anchor,
                    context.view[newAnswerId].state.selection.$head,
                  ),
                ),
              );

              let type = context.view.main.state.schema.nodes.paragraph;
              context.view[newAnswerId].dispatch(
                context.view[newAnswerId].state.tr.insert(0, type.create()),
              );
            }
            context.view[newAnswerId].dispatch(
              context.view[newAnswerId].state.tr.setSelection(
                TextSelection.between(
                  context.view[newAnswerId].state.selection.$anchor,
                  context.view[newAnswerId].state.selection.$head,
                ),
              ),
            );
          }, 100);
        }
      }
    });
  };

  const questionNumber = 1;
  const readOnly = !isEditable;
  const showAddIcon = true;
  const showRemoveIcon = true;

  return (
    <Wrapper>
      <InfoRow>
        <QuestionNunber>Answer {questionNumber}</QuestionNunber>
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
            />
          </FeedBack>
        </QuestionWrapper>
        <IconsWrapper>
          {showAddIcon && !readOnly && (
            <Button
              icon={
                <PlusSquareOutlined
                  onClick={() => addOption(node.attrs.id)}
                  title="Add Option"
                />
              }
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
