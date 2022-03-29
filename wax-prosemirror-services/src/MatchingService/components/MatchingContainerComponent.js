/* eslint-disable react/prop-types */
import React, { useContext, useRef, useState } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import { Icon } from 'wax-prosemirror-components';
import styled from 'styled-components';
import FeedbackComponent from './FeedbackComponent';
import ContainerEditor from './ContainerEditor';
import DropDownComponent from './DropDownComponent';

const MatchingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 38px 15px 38px;
  margin-top: 10px;
`;

const MatchingContainer = styled.div`
  border: 3px solid #f5f5f7;
  margin-bottom: 30px;
  padding: 10px;
`;

const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Option = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const ActionButton = styled.button`
  height: 24px;
  border: none;
  background: transparent;
  cursor: pointer;
  padding-left: 0;
`;

const StyledIconAction = styled(Icon)`
  height: 24px;
  width: 24px;
`;

const CreateOptions = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const OptionArea = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const AddOption = styled.div`
  display: flex;
`;

export default ({ node, view, getPos }) => {
  const context = useContext(WaxContext);
  const {
    pmViews: { main },
  } = context;
  const [options, setOptions] = useState([]);
  const addOptionRef = useRef(null);

  const customProps = main.props.customValues;

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  const readOnly = !isEditable;

  const addOption = event => {
    // if (options.length === 0) {
    //   setOptions(options.push(addOptionRef.current.value));
    // } else {
    // }
    setOptions(prevOptions => [...prevOptions, addOptionRef.current.value]);
  };

  const addAnswer = event => {};
  return (
    <MatchingWrapper>
      <span>Matching</span>
      <MatchingContainer className="matching">
        <QuestionWrapper>
          <InputsContainer>
            <Option>
              {!readOnly && (
                <ActionButton
                  onClick={() => addAnswer(node.attrs.id)}
                  type="button"
                >
                  <StyledIconAction name="plusSquare" />
                </ActionButton>
              )}
              <ContainerEditor getPos={getPos} node={node} view={view} />
              <DropDownComponent />
            </Option>
          </InputsContainer>
        </QuestionWrapper>
        {!readOnly && (
          <CreateOptions>
            <OptionArea>Options: {options}</OptionArea>
            <AddOption>
              <input placeholder="Add Option" ref={addOptionRef} type="text" />
              <button onClick={addOption} type="button">
                Add
              </button>
            </AddOption>
          </CreateOptions>
        )}
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
