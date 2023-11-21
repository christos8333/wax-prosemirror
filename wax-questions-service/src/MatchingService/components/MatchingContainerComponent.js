/* eslint-disable react/destructuring-assignment */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { WaxContext, DocumentHelpers, Icon } from 'wax-prosemirror-core';
import useDynamicRefs from 'use-dynamic-refs';
import styled from 'styled-components';
import FeedbackComponent from '../../MultipleChoiceQuestionService/components/FeedbackComponent';
import ContainerEditor from './ContainerEditor';

const MatchingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 38px 15px 38px;
  margin-top: 10px;

  .ProseMirror-selectednode {
    outline: none;
  }
`;

const MatchingContainerTool = styled.div`
  border: 3px solid #f5f5f7;
  border-bottom: none;
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

const RemoveQuestionButton = styled.button`
  background: transparent;
  cursor: pointer;
  margin-top: 6px;
  border: none;
  position: relative;
  bottom: 2px;
  left: -11px;
  float: right;
`;

const StyledIconActionRemove = styled(Icon)`
  height: 24px;
  width: 24px;
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
  const [getRef, setRef] = useDynamicRefs();

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

    const allNodes = getNodes(context.pmViews.main);
    // const allNodesOptions = getOptionsNodes(context.pmViews.main);
    // console.log(allNodesOptions);

    allNodes.forEach(singleNode => {
      if (singleNode.node.attrs.id === node.attrs.id) {
        singleNode.node.content.content.forEach(parentNodes => {
          parentNodes.forEach(optionNode => {
            if (optionNode.type.name === 'matching_option') {
              // setTimeout(() => {
              //   context.pmViews.main.dispatch(
              //     context.pmViews.main.state.tr
              //       .setMeta('addToHistory', false)
              //       .setNodeMarkup(allNodesOptions[0].pos, undefined, {
              //         ...allNodesOptions[0].node.attrs,
              //         options: options.filter(option => option.value !== value),
              //         correct: '',
              //       }),
              //   );
              //   console.log(allNodesOptions);
              // });

              /* eslint-disable-next-line no-param-reassign */
              optionNode.attrs.options = options.filter(
                option => option.value !== value,
              );
              if (optionNode.attrs.correct === value) {
                optionNode.attrs.correct = null;
              }
            }
          });
        });
      }
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

  useEffect(() => {
    const listener = event => {
      if (event.code === 'Enter') {
        event.preventDefault();
        options.forEach(option => {
          if (document.activeElement === getRef(option.value).current) {
            getRef(option.value).current.click();
          }
        });
      }
    };

    options.forEach(option => {
      if (getRef(option.value) && getRef(option.value).current)
        getRef(option.value).current.addEventListener('keydown', listener);
    });

    return () => {
      options.forEach(option => {
        if (getRef(option.value) && getRef(option.value).current)
          getRef(option.value).current.removeEventListener('keydown', listener);
      });
    };
  }, [options]);

  const { testMode } = customProps;
  const { feedback } = node.attrs;

  const removeQuestion = () => {
    const allNodes = getNodes(context.pmViews.main);

    allNodes.forEach(singleNode => {
      if (singleNode.node.attrs.id === node.attrs.id) {
        context.pmViews.main.dispatch(
          context.pmViews.main.state.tr.delete(
            singleNode.pos,
            singleNode.pos + singleNode.node.nodeSize,
          ),
        );
      }
    });
  };

  return (
    <MatchingWrapper>
      {/* <span>Matching</span> */}
      {!testMode && !readOnly && (
        <MatchingContainerTool>
          <RemoveQuestionButton
            aria-label="delete this question"
            onClick={removeQuestion}
            type="button"
          >
            <StyledIconActionRemove name="deleteOutlinedQuestion" />
          </RemoveQuestionButton>
        </MatchingContainerTool>
      )}
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
                              aria-label={`delete ${option.label}`}
                              onClick={() => removeOption(option.value)}
                              ref={setRef(option.value)}
                              type="button"
                            >
                              <StyledIconAction
                                label={`delete ${option.label}`}
                                name="deleteOutlined"
                              />
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
                <button
                  aria-label="add new option"
                  onClick={addOption}
                  ref={addOptionBtnRef}
                  type="button"
                >
                  Add Option
                </button>
              </AddOption>
            )}
          </CreateOptions>
        )}
        {!testMode && !(readOnly && feedback === '') && (
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

const getOptionsNodes = view => {
  const allNodes = DocumentHelpers.findInlineNodes(view.state.doc);
  const matchingOptionNodes = [];
  allNodes.forEach(node => {
    if (node.node.type.name === 'matching_option') {
      matchingOptionNodes.push(node);
    }
  });
  return matchingOptionNodes;
};
