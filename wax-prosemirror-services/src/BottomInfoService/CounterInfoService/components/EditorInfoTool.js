import React, {
  useMemo,
  useState,
  useRef,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import styled from 'styled-components';
import { grid, override } from '@pubsweet/ui-toolkit';
import { v4 as uuidv4 } from 'uuid';
import {
  WaxContext,
  DocumentHelpers,
  useOnClickOutside,
} from 'wax-prosemirror-core';
import { MenuButton } from 'wax-prosemirror-components';

const Wrapper = styled.div`
  font-size: 0;
  position: relative;
  z-index: 2;

  button {
    background: ${props => (props.active ? `#535E76` : '#fff')};
    border: ${props =>
      props.active ? `1px solid #535E76` : `1px solid #D8DAE0`};

    &:hover {
      background: ${props => (props.active ? `#535E76` : '#D8DAE0')};
    }
    box-shadow: 0px -2px 6px 1px rgba(204, 204, 204, 0.41);
  }

  &:before {
    border-bottom: ${props =>
      props.active ? `8px solid #535E76` : `8px solid #D8DAE0`};

    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    bottom: 26px;
    content: '';
    height: 0;
    left: 48%;
    position: relative;
    width: 0;
  }
  ${override('Wax.CounterWrapper')}
`;

const DropWrapper = styled.div`
  background: white;
  margin-top: ${grid(1)};
  position: absolute;
  top: 32px;
  width: max-content;
  ${override('Wax.CounterDropWrapper')}
`;

const CounterInfoComponent = styled.div`
  background: #fff;
  border-radius: 1.03093% / 8%;
  bottom: 45px;
  box-shadow: rgb(9 30 66 / 25%) 0px 4px 8px 0px,
    rgb(9 30 66 / 31%) 0px 0px 1px 0px;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  padding: calc(4px * 2);
  position: fixed;
  right: 31px;
  transform-origin: 50% 50% 0px;
  ${override('Wax.CounterInfoComponent')}
`;

const Counter = styled.div`
  color: black;
  display: block;
  font-size: 14px;
  height: 25px;
  margin: 5px;
  min-width: 150px;
  ${override('Wax.Counters')}
`;

const EditorInfoTool = ({ view: { state }, item }) => {
  const { title } = item;
  const [isOpen, setIsOpen] = useState(false);
  const [getWordCountFromState, setTotalWords] = useState(0);
  const [totalCharCount, setTotalCharCount] = useState();
  const [totalCharCountWithoutSpace, setTotalCharWithoutSpace] = useState();
  const [getSelectionCountFromState, setSelectedTextCount] = useState();
  const [paraCount, setTotalParagraph] = useState();
  const [imgCount, setImgCount] = useState();
  const [tableCount, setTableCount] = useState();
  const [footnoteCount, setFootNoteCount] = useState();
  const [blocklevelNode, setBlockLevelNodes] = useState();
  const ref = useRef();
  const {
    activeView,
    pmViews: { main },
  } = useContext(WaxContext);
  const allBlockNodes = DocumentHelpers.findBlockNodes(main.state.doc);
  const InlineNodes = DocumentHelpers.findInlineNodes(main.state.doc);

  useOnClickOutside(ref, () => setIsOpen(false));

  const infoDropDownOptions = [
    { name: `${getWordCountFromState} Words` },
    { name: `${totalCharCount} Characters` },
    { name: `${totalCharCountWithoutSpace} Characters Without Space` },
    { name: `${paraCount} Paragraph` },
    { name: `${imgCount} Images` },
    { name: `${tableCount} Tables` },
    { name: `${footnoteCount} Footnotes` },
    { name: `${blocklevelNode} Block-Level Nodes` },
  ];

  const renderList = () => {
    const lists = [];

    Object.keys(infoDropDownOptions).forEach(key => {
      lists.push(
        <Counter key={uuidv4()} title={infoDropDownOptions[key].name}>
          <span>{infoDropDownOptions[key].name}</span>
        </Counter>,
      );
    });
    return <div>{lists}</div>;
  };
  const getCount = useCallback(() => {
    let getWordCountFromStates = 0;
    InlineNodes.forEach(value => {
      if (value.node.text !== undefined && value.node.text.length > 0) {
        value.node.text
          .trim()
          .split(' ')
          .forEach((key, pos) => {
            if (key.length > 0) {
              getWordCountFromStates += 1;
            }
          });
      }
    });
    return getWordCountFromStates;
  });

  const getCharCount = useCallback(() => {
    let totalCharCounts = 0;

    InlineNodes.forEach(value => {
      if (value.node.text !== undefined) {
        totalCharCounts += value.node.text.length;
      }
    });

    return totalCharCounts;
  });
  const getCharCountWithoutSpace = useCallback(() => {
    let totalCharCountWithoutSpaces = 0;
    InlineNodes.forEach(value => {
      if (value.node.text !== undefined) {
        totalCharCountWithoutSpaces += value.node.text.replace(/\s+/g, '')
          .length;
      }
    });

    return totalCharCountWithoutSpaces;
  });
  useEffect(() => {
    let footNoteCount = 0;
    let blockLevelCount = 0;
    let paraCounts = 0;
    let tableCounts = 0;
    let imgCounts = 0;
    let listTableCount = 0;
    let nestTableCount = 0;
    allBlockNodes.forEach(value => {
      if (value.pos === 0) {
        blockLevelCount = 0;
      } else {
        blockLevelCount = allBlockNodes.length;
      }
    });
    setBlockLevelNodes(blockLevelCount);
    allBlockNodes.forEach(nodes => {
      nodes.node.forEach(node => {
        if (node.type.name === 'image') {
          imgCounts += 1;
        }
        if (node.type.groups.includes('notes')) {
          footNoteCount += 1;
        }
      });
    });
    main.state.doc.content.content.forEach(value => {
      if (value.attrs.class === 'paragraph' && value.content.size > 0) {
        paraCounts += 1;
      }
      if (value.type.name === 'table') {
        tableCounts += 1;
      }
      value.content.content.forEach(listTable => {
        listTable.content.content.forEach(lastListTable => {
          if (lastListTable.type.name === 'table') {
            listTableCount += 1;
          }
          lastListTable.content.content.forEach(nestedTable => {
            nestedTable.content.content.forEach(nestedTypeTable => {
              if (nestedTypeTable.type.name === 'table') {
                nestTableCount += 1;
              }
            });
          });
        });
      });
    });
    setImgCount(imgCounts);
    setTotalParagraph(paraCounts);
    setTableCount(tableCounts + listTableCount + nestTableCount);
    setFootNoteCount(footNoteCount);
    setTotalCharCount(getCharCount());
    setTotalWords(getCount());
    setTotalCharWithoutSpace(getCharCountWithoutSpace());
    let selectedCountPara = 0;
    let selectedCountList = 0;
    let selectedCountNest = 0;
    let noteTextValue = 0;
    let footNodeCount = 0;
    let selectedListTableCount = 0;
    let finalNestedValueCount = 0;
    state.selection.content().content.content.forEach(value => {
      value.content.content.forEach(textValue => {
        if (textValue.text) {
          const textArray = textValue.text.trim().split(' ');
          let isChar = false;
          textArray.forEach((key, pos) => {
            // eslint-disable-next-line no-restricted-globals
            if (
              key.charCodeAt(pos) !== 32 &&
              isNaN(key.charCodeAt(pos)) === false
            ) {
              isChar = true;
            }
          });
          if (isChar) {
            selectedCountPara += textValue.text.trim().split(' ').length;
          }
        }
        textValue.content.content.forEach(listValue => {
          if (listValue.text && listValue.text !== ' ') {
            const listArray = listValue.text.trim().split(' ');
            let isFootChar = false;
            listArray.forEach((key, pos) => {
              if (key.charCodeAt(pos) !== 32) {
                isFootChar = true;
              }
            });
            if (isFootChar) {
              footNodeCount += listValue.text.trim().split(' ').length;
            }
          }
          listValue.content.content.forEach(listItem => {
            if (listItem.text && listItem.text !== ' ') {
              const itemArray = listItem.text.trim().split(' ');
              let isItemChar = false;
              itemArray.forEach((key, pos) => {
                // eslint-disable-next-line no-restricted-globals
                if (
                  key.charCodeAt(pos) !== 32 &&
                  isNaN(key.charCodeAt(pos)) === false
                ) {
                  isItemChar = true;
                }
              });
              if (isItemChar) {
                selectedCountList += listItem.text.trim().split(' ').length;
              }
            }
            listItem.content.content.forEach(nestedItem => {
              nestedItem.content.content.forEach(nestIn => {
                if (nestIn.text !== undefined) {
                  const nestArray = nestIn.text.trim().split(' ');
                  let isNestChar = false;
                  nestArray.forEach((key, pos) => {
                    // eslint-disable-next-line no-restricted-globals
                    if (
                      key.charCodeAt(pos) !== 32 &&
                      isNaN(key.charCodeAt(pos)) === false
                    ) {
                      isNestChar = true;
                    }
                  });
                  if (nestIn.text && isNestChar) {
                    selectedCountNest += nestIn.text.trim().split(' ').length;
                  }
                }

                nestIn.content.content.forEach(listTable => {
                  if (listTable.text !== undefined) {
                    const listTableArray = listTable.text.trim().split(' ');
                    let isListChar = false;
                    listTableArray.forEach((key, pos) => {
                      // eslint-disable-next-line no-restricted-globals
                      if (
                        key.charCodeAt(pos) !== 32 &&
                        isNaN(key.charCodeAt(pos)) === false
                      ) {
                        isListChar = true;
                      }
                    });
                    if (listTable.text && isListChar) {
                      selectedListTableCount += listTable.text.trim().split(' ')
                        .length;
                    }
                  }

                  listTable.content.content.forEach(tableValue => {
                    tableValue.content.content.forEach(finalTableValue => {
                      if (finalTableValue.text !== undefined) {
                        const finalTableArray = finalTableValue.text
                          .trim()
                          .split(' ');
                        let isFinalTable = false;
                        finalTableArray.forEach((key, pos) => {
                          // eslint-disable-next-line no-restricted-globals
                          if (
                            key.charCodeAt(pos) !== 32 &&
                            isNaN(key.charCodeAt(pos)) === false
                          ) {
                            isFinalTable = true;
                          }
                        });
                        if (finalNestedValueCount.text && isFinalTable) {
                          finalNestedValueCount = finalTableValue.text
                            .trim()
                            .split(' ').length;
                        }
                      }
                    });
                  });
                });
              });
            });
          });
        });
      });
      if (value.text !== undefined) {
        const valueArray = value.text.trim().split(' ');
        let isValue = false;
        valueArray.forEach((key, pos) => {
          // eslint-disable-next-line no-restricted-globals
          if (
            key.charCodeAt(pos) !== 32 &&
            isNaN(key.charCodeAt(pos)) === false
          ) {
            isValue = true;
          }
        });
        if (isValue) {
          noteTextValue += value.text.trim().split(' ').length;
        }
      }
    });
    setSelectedTextCount(
      selectedCountNest +
        finalNestedValueCount +
        selectedListTableCount +
        selectedCountPara +
        selectedCountList +
        noteTextValue +
        footNodeCount,
    );
    if (
      activeView.state.selection.$from.pos ===
      activeView.state.selection.$to.pos
    ) {
      setSelectedTextCount(0);
    }
  });
  const MenuButtonComponent = useMemo(
    () => (
      <Wrapper active={isOpen} ref={ref}>
        <MenuButton
          active={isOpen}
          disabled={false}
          label={`${
            getSelectionCountFromState > 0
              ? getSelectionCountFromState
              : getWordCountFromState
          } 
          word${
            getSelectionCountFromState && getSelectionCountFromState > 1
              ? 's'
              : ''
          }${
            !getSelectionCountFromState && getWordCountFromState > 1 ? 's' : ''
          }`}
          onMouseDown={() => {
            setIsOpen(!isOpen);
          }}
          title={title}
        />

        {isOpen && (
          <DropWrapper>
            <CounterInfoComponent
              close={() => {
                setIsOpen(false);
              }}
              item={item}
              key={uuidv4()}
              view={state}
            >
              {renderList()}
            </CounterInfoComponent>
          </DropWrapper>
        )}
      </Wrapper>
    ),
    [isOpen, getWordCountFromState, getSelectionCountFromState],
  );
  return MenuButtonComponent;
};

export default EditorInfoTool;
