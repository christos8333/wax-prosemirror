/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TextSelection } from 'prosemirror-state';
import { Fragment } from 'prosemirror-model';
import styled from 'styled-components';
import { Icon } from 'wax-prosemirror-components';
import { WaxContext } from 'wax-prosemirror-core';
import EditorComponent from './EditorComponent';
import DropDownComponent from './DropDownComponent';
import ReadOnlyDropDownComponent from './ReadOnlyDropDownComponent';

const Option = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 10px;
  width: 100%;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 7%;
`;

const DropDownContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ActionButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  height: 24px;
  padding-left: 0;
`;

const StyledIconAction = styled(Icon)`
  height: 24px;
  width: 24px;
`;

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;
const CorrectAnswer = styled.span`
  span {
    color: #008000;
  }
`;

const Answer = styled.span`
  span {
    color: ${props => (props.isCorrect ? '#008000' : '#FF3030')};
  }
`;

export default ({ node, view, getPos }) => {
  const context = useContext(WaxContext);
  const {
    pmViews: { main },
  } = context;

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  const readOnly = !isEditable;
  const customProps = main.props.customValues;
  const { testMode, showFeedBack } = customProps;

  const addAnswer = () => {
    const nodeId = node.attrs.id;
    const newAnswerId = uuidv4();
    main.state.doc.descendants((editorNode, index) => {
      if (editorNode.type.name === 'matching_option') {
        if (editorNode.attrs.id === nodeId) {
          main.dispatch(
            main.state.tr.setSelection(
              new TextSelection(
                main.state.tr.doc.resolve(editorNode.nodeSize + index),
              ),
            ),
          );

          const newOption = main.state.config.schema.nodes.matching_option.create(
            { id: newAnswerId },
            Fragment.empty,
          );
          main.dispatch(main.state.tr.replaceSelectionWith(newOption));
        }
      }
    });
  };

  const removeAnswer = () => {
    main.state.doc.descendants((sinlgeNode, pos) => {
      if (sinlgeNode.attrs.id === node.attrs.id) {
        main.dispatch(
          main.state.tr.deleteRange(pos, pos + sinlgeNode.nodeSize),
        );
      }
    });
  };

  const answer = node.attrs.options.find(
    option => option.value === node.attrs.answer,
  );

  const correct = node.attrs.options.find(
    option => option.value === node.attrs.correct,
  );

  const isCorrect = node.attrs.correct === node.attrs.answer;

  return (
    <Option>
      {!readOnly && (
        <ButtonsContainer>
          <ActionButton onClick={addAnswer} type="button">
            <StyledIconAction name="plusSquare" />
          </ActionButton>
          {!node.attrs.isfirst && (
            <ActionButton onClick={removeAnswer} type="button">
              <StyledIconAction name="deleteOutlined" />
            </ActionButton>
          )}
        </ButtonsContainer>
      )}
      <EditorComponent getPos={getPos} node={node} view={view} />
      <DropDownContainer>
        {(!readOnly || (readOnly && !testMode && !showFeedBack)) && (
          <DropDownComponent getPos={getPos} node={node} view={view} />
        )}

        {readOnly && testMode && !showFeedBack && (
          <ReadOnlyDropDownComponent getPos={getPos} node={node} view={view} />
        )}

        {readOnly && showFeedBack && (
          <AnswerContainer>
            <CorrectAnswer>
              Correct : &nbsp;{correct && <span>{correct.label} </span>}
            </CorrectAnswer>
            <Answer isCorrect={isCorrect}>
              Answer : &nbsp;
              {answer && <span>{answer.label} </span>}
            </Answer>
          </AnswerContainer>
        )}
      </DropDownContainer>
    </Option>
  );
};
