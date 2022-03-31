/* eslint-disable react/prop-types */
import React, { useContext, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
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
  padding-bottom: 10px;
`;

const OptionArea = styled.div`
  display: flex;
  width: 100%;

  ul {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    margin: 0;
    padding: 0;
    li {
      list-style-type: none;
      padding-right: 7px;
      padding-bottom: 7px;

      span {
        background: #535e76;
        color: white;
        padding: 3px 3px 3px 10px;
        border-radius: 12px;
      }
      buttton {
      }
      svg {
        fill: white;
        width: 16px;
        height: 16px;
      }
    }
  }
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

  const addOption = () => {
    const obj = { label: addOptionRef.current.value, key: uuidv4() };
    setOptions(prevOptions => [...prevOptions, obj]);
  };

  const removeOption = key => {
    setOptions(options.filter(option => option.key !== key));
  };

  const addAnswer = () => {};

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
              <DropDownComponent options={options} />
            </Option>
          </InputsContainer>
        </QuestionWrapper>
        {!readOnly && (
          <CreateOptions>
            <OptionArea>
              Options:
              <ul>
                {options.map((option, index) => {
                  return (
                    <li key={option.key}>
                      <span>
                        {option.label} &nbsp;
                        <ActionButton
                          onClick={() => removeOption(option.key)}
                          type="button"
                        >
                          <StyledIconAction name="deleteOutlined" />
                        </ActionButton>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </OptionArea>
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
