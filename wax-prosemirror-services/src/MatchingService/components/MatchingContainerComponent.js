/* eslint-disable react/destructuring-assignment */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { WaxContext, DocumentHelpers, Icon } from 'wax-prosemirror-core';
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
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;

    li {
      list-style-type: none;
      padding-bottom: 7px;
      padding-right: 7px;

      span {
        background: #535e76;
        border-radius: 12px;
        color: white;
        padding: 3px 3px 3px 10px;
      }

      svg {
        fill: white;
        height: 16px;
        width: 16px;
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
    background: #fff;
    border: 1px solid #535e76;
    color: #535e76;
    cursor: pointer;
    margin-left: 20px;
    padding: 4px 8px 4px 8px;

    &:hover {
      background: #535e76;
      border: 1px solid #535e76;
      color: #fff;
      cursor: pointer;
      margin-right: 20px;
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
  const addOptionBtnRef = useRef(null);

  const customProps = main.props.customValues;

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  const readOnly = !isEditable;

  useEffect(() => {
    const listener = event => {
      if (event.code === 'Enter') {
        event.preventDefault();
        if (addOptionBtnRef.current) addOptionBtnRef.current.click();
      }
    };
    if (addOptionBtnRef.current)
      addOptionBtnRef.current.addEventListener('keydown', listener);
    return () => {
      if (addOptionBtnRef.current)
        addOptionBtnRef.current.removeEventListener('keydown', listener);
    };
  }, []);

  useEffect(() => {
    const allNodes = getNodes(main);

    /* TEMP TO SAVE NODE OPTIONS TODO: SAVE IN CONTEXT OPTIONS */
    saveInChildOptions(allNodes);

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
  }, [options, JSON.stringify(context.pmViews.main.state)]);

  const addOption = () => {
    if (addOptionRef.current.value.trim() === '') return;
    const obj = { label: addOptionRef.current.value, value: uuidv4() };
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

  const removeOption = value => {
    setOptions(options.filter(option => option.value !== value));
    setAddingOption(true);
    setTimeout(() => {
      setAddingOption(false);
    });
  };

  const saveInChildOptions = allNodes => {
    allNodes.forEach(singleNode => {
      if (singleNode.node.attrs.id === node.attrs.id) {
        singleNode.node.content.content.forEach(parentNodes => {
          parentNodes.forEach(optionNode => {
            if (optionNode.type.name === 'matching_option')
              /* eslint-disable-next-line no-param-reassign */
              optionNode.attrs.options = options;
          });
        });
      }
    });
  };

  const { testMode } = customProps;

  return (
    <MatchingWrapper>
      <span>Matching</span>
      <MatchingContainer className="matching">
        <QuestionWrapper>
          <ContainerEditor getPos={getPos} node={node} view={view} />
        </QuestionWrapper>
        {(!readOnly ||
          (readOnly && !customProps.testMode && !customProps.showFeedBack)) && (
          <CreateOptions>
            <OptionArea>
              {options.length > 0 && (
                <ul>
                  <li>Options: </li>
                  {options.map(option => {
                    return (
                      <li key={option.value}>
                        <span>
                          {option.label} &nbsp;
                          {!readOnly && (
                            <ActionButton
                              onClick={() => removeOption(option.value)}
                              type="button"
                            >
                              <StyledIconAction name="deleteOutlined" />
                            </ActionButton>
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </OptionArea>

            {!readOnly && (
              <AddOption>
                <input
                  onChange={updateOptionText}
                  onKeyPress={handleKeyDown}
                  placeholder="Type an option ..."
                  ref={addOptionRef}
                  type="text"
                  value={optionText}
                />
                <button onClick={addOption} ref={addOptionBtnRef} type="button">
                  Add Option
                </button>
              </AddOption>
            )}
          </CreateOptions>
        )}
        {!testMode && (
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
