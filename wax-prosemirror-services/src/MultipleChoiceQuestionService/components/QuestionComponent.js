/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import styled from 'styled-components';
import { TextSelection } from 'prosemirror-state';
import { WaxContext } from 'wax-prosemirror-core';
import { PlusSquareOutlined, DeleteOutlined } from '@ant-design/icons';
import { Fragment } from 'prosemirror-model';
import { v4 as uuidv4 } from 'uuid';
import helpers from '../helpers/helpers';
import EditorComponent from './EditorComponent';
import SwitchComponent from './SwitchComponent';
import FeedbackComponent from './FeedbackComponent';
import Button from './Button';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
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
  flex-direction: column;
  width: 100%;
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
    box-shadow: none;
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

export default ({ node, view, getPos }) => {
  const context = useContext(WaxContext);
  const {
    view: { main },
  } = context;

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  const removeOption = () => {
    main.state.doc.nodesBetween(getPos(), getPos() + 1, (sinlgeNode, pos) => {
      if (sinlgeNode.attrs.id === node.attrs.id) {
        main.dispatch(
          main.state.tr.deleteRange(getPos(), getPos() + sinlgeNode.nodeSize),
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
          }, 120);
        }
      }
    });
  };

  const readOnly = !isEditable;
  const showAddIcon = true;
  const showRemoveIcon = true;

  return (
    <Wrapper>
      <QuestionControlsWrapper>
        <InfoRow>
          <QuestionNunber />
          <SwitchComponent getPos={getPos} node={node} />
        </InfoRow>
        <QuestionWrapper>
          <QuestionData>
            <EditorComponent getPos={getPos} node={node} view={view} />
          </QuestionData>
          <FeedbackComponent getPos={getPos} node={node} view={view} />
        </QuestionWrapper>
      </QuestionControlsWrapper>
      <IconsWrapper>
        {showAddIcon && !readOnly && (
          <Button
            icon={<PlusSquareOutlined title="Add Option" />}
            onClick={() => addOption(node.attrs.id)}
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
    </Wrapper>
  );
};
