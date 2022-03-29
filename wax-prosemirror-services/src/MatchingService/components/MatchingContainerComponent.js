/* eslint-disable react/prop-types */
import React, { useContext, useRef, useState } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import { Icon } from 'wax-prosemirror-components';
import styled from 'styled-components';
import FeedbackComponent from './FeedbackComponent';

const MatchingContainer = styled.div`
  border: 3px solid #f5f5f7;
  margin-bottom: 30px;
`;

const MatchingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ;
  margin: 0px 38px 15px 38px;
  margin-top: 10px;
`;

const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const LeftArea = styled.div`
  display: flex;
  flex-dierection: row;
`;
const RightArea = styled.div`
  display: flex;
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;

  input {
    margin-bottom: 10px;
  }
`;

const FirstOption = styled.div`
  display: flex;
  flex-direction: row;
`;

const CreateOptions = styled.div`
  display: flex;
  margin-top: 10px;
  border: 1px solid black;
`;

const ActionButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const StyledIconAction = styled(Icon)`
  height: 24px;
  width: 24px;
`;

const OptionArea = styled.div`
  display: flex;
`;

const AddOption = styled.div`
  display: flex;
`;

export default ({ node, view, getPos }) => {
  const context = useContext(WaxContext);
  const {
    pmViews: { main },
  } = context;
  const [inputList, setInputList] = useState([]);
  const addAnswerRef = useRef(null);

  const customProps = main.props.customValues;

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  const readOnly = !isEditable;

  const Input = () => {
    return (
      <input
        placeholder="Your answer here"
        ref={addAnswerRef}
        type="text"
        value=""
      />
    );
  };

  const addOption = event => {
    setInputList(inputList.concat(<Input key={inputList.length} />));
  };

  return (
    <MatchingWrapper>
      <span>Matching</span>
      <MatchingContainer className="matching">
        <QuestionWrapper>
          <LeftArea>
            <InputsContainer>
              <FirstOption>
                {Input()}
                {!readOnly && (
                  <ActionButton
                    onClick={() => addOption(node.attrs.id)}
                    type="button"
                  >
                    <StyledIconAction name="plusSquare" />
                  </ActionButton>
                )}
              </FirstOption>
              {inputList}
            </InputsContainer>
          </LeftArea>
          <RightArea>Right</RightArea>
        </QuestionWrapper>
        <CreateOptions>
          <OptionArea>Options Area</OptionArea>
          <AddOption>
            <input type="text"></input>
          </AddOption>
        </CreateOptions>
        {!(readOnly && !customProps.showFeedBack) && (
          <FeedbackComponent
            getPos={getPos}
            node={node}
            readOnly={readOnly}
            view={view}
          />
        )}
      </MatchingContainer>
    </MatchingWrapper>
  );
};
