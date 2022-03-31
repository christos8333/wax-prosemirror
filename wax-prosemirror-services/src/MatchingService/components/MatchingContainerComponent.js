/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { WaxContext } from 'wax-prosemirror-core';
import { Icon } from 'wax-prosemirror-components';
import { DocumentHelpers } from 'wax-prosemirror-utilities';
import styled from 'styled-components';
import FeedbackComponent from './FeedbackComponent';
import ContainerEditor from './ContainerEditor';

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
  input {
    border: none;
    border-bottom: 1px solid black;
    &:focus {
      outline: none;
    }

    ::placeholder {
      color: rgb(170, 170, 170);
      font-style: italic;
    }
  }
  button {
    border: 1px solid #535e76;
    cursor: pointer;
    color: #535e76;
    margin-left: 20px;
    background: #fff;
    padding: 4px 8px 4px 8px;
    &:hover {
      border: 1px solid #535e76;
      cursor: pointer;
      color: #535e76;
      margin-right: 20px;
      background: #fff;
      background: #535e76;
      color: #fff;
      padding: 4px 8px 4px 8px;
    }
  }
`;

export default ({ node, view, getPos }) => {
  const context = useContext(WaxContext);
  const {
    pmViews: { main },
  } = context;
  const [options, setOptions] = useState(node.attrs.options);
  const [optionText, setOptionText] = useState('');
  const [addingOption, setAddingOption] = useState(false);
  const addOptionRef = useRef(null);

  const customProps = main.props.customValues;

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  const readOnly = !isEditable;

  useEffect(() => {
    const allNodes = getNodes(main);
    if (!addingOption) return;
    allNodes.forEach(singleNode => {
      if (singleNode.node.attrs.id === node.attrs.id) {
        main.dispatch(
          main.state.tr
            .setMeta('addToHistory', false)
            .setNodeMarkup(getPos(), undefined, {
              ...singleNode.node.attrs,
              options,
            }),
        );
      }
    });
  }, [options]);

  const addOption = () => {
    if (addOptionRef.current.value.trim() === '') return;
    const obj = { label: addOptionRef.current.value, key: uuidv4() };
    setOptions(prevOptions => [...prevOptions, obj]);
    setAddingOption(true);
    setTimeout(() => {
      setAddingOption(false);
    });
    setOptionText('');
    addOptionRef.current.focus();
  };

  const updateOptionText = () => {
    setOptionText(addOptionRef.current.value);
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter' || event.which === 13) {
      addOption();
    }
  };

  const removeOption = key => {
    setOptions(options.filter(option => option.key !== key));
    setAddingOption(true);
    setTimeout(() => {
      setAddingOption(false);
    });
  };

  return (
    <MatchingWrapper>
      <span>Matching</span>
      <MatchingContainer className="matching">
        <QuestionWrapper>
          <ContainerEditor getPos={getPos} node={node} view={view} />
        </QuestionWrapper>
        {!readOnly && (
          <CreateOptions>
            <OptionArea>
              {options.length > 0 && (
                <ul>
                  <li>Options: </li>
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
              )}
            </OptionArea>
            <AddOption>
              <input
                onChange={updateOptionText}
                onKeyPress={handleKeyDown}
                placeholder="Type an option ..."
                ref={addOptionRef}
                type="text"
                value={optionText}
              />
              <button onClick={addOption} type="button">
                Add Option
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

const getNodes = view => {
  const allNodes = DocumentHelpers.findBlockNodes(view.state.doc);
  const matchingContainerNodes = [];
  allNodes.forEach(node => {
    if (node.node.type.name === 'matching_container') {
      matchingContainerNodes.push(node);
    }
  });
  return matchingContainerNodes;
};
