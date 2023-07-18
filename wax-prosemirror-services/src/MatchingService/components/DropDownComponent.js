/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, {
  useMemo,
  useContext,
  useState,
  useEffect,
  useRef,
  createRef,
} from 'react';
import styled from 'styled-components';
import {
  WaxContext,
  DocumentHelpers,
  Icon,
  useOnClickOutside,
} from 'wax-prosemirror-core';

const Wrapper = styled.div``;

const DropDownButton = styled.button`
  background: #fff;
  border: none;
  color: #000;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${props => (props.disabled ? `0.4` : `1`)};
  display: flex;
  position: relative;
  width: 160px;

  span {
    position: relative;
    top: 2px;
  }
`;

const DropDownMenu = styled.div`
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  background: #fff;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  box-shadow: 0 0.2rem 0.4rem rgb(0 0 0 / 10%);
  margin: 10px auto auto;
  position: absolute;
  width: 170px;
  max-height: 150px;
  overflow-y: auto;
  z-index: 2;

  span {
    cursor: pointer;
    padding: 8px 10px;
  }

  span:focus {
    background: #f2f9fc;
    outline: 2px solid #f2f9fc;
  }
`;

const StyledIcon = styled(Icon)`
  height: 18px;
  width: 18px;
  margin-left: auto;
`;

const DropComponent = ({ getPos, node, view, uniqueId }) => {
  const [selectedOption, setSelectedOption] = useState(node.attrs.correct);
  const [allOptions, setAllOptions] = useState(node.attrs.options);

  const itemRefs = useRef([]);
  const wrapperRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const context = useContext(WaxContext);
  const {
    pmViews: { main },
    activeView,
  } = context;

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  let isDisabled = !isEditable;
  if (allOptions && allOptions.length === 0) isDisabled = true;

  const onChange = option => {
    const allNodes = getNodes(main);
    allNodes.forEach(singleNode => {
      if (singleNode.node.attrs.id === node.attrs.id) {
        main.dispatch(
          main.state.tr
            .setMeta('addToHistory', false)
            .setNodeMarkup(singleNode.pos, undefined, {
              ...singleNode.node.attrs,
              correct: option.value,
            }),
        );
      }
    });
    openCloseMenu();
    setSelectedOption(option.value);
  };

  useOnClickOutside(wrapperRef, () => setIsOpen(false));

  useEffect(() => {
    const theNode = getMatchingNode(main, node);
    setAllOptions(theNode?.attrs?.options);
    setSelectedOption(theNode?.attrs?.correct);
  }, [getMatchingNode(main, node)?.attrs?.options]);

  useEffect(() => {
    if (isDisabled) setIsOpen(false);
  }, [isDisabled]);

  const openCloseMenu = () => {
    if (!isDisabled) setIsOpen(!isOpen);
    if (isOpen)
      setTimeout(() => {
        activeView.focus();
      });
  };

  const onKeyDown = (e, index) => {
    e.preventDefault();
    if (e.keyCode === 40) {
      // arrow down
      if (index === itemRefs.current.length - 1) {
        itemRefs.current[0].current.focus();
      } else {
        itemRefs.current[index + 1].current.focus();
      }
    }

    // arrow up
    if (e.keyCode === 38) {
      if (
        index === 0 &&
        itemRefs.current[itemRefs.current.length - 1].current
      ) {
        itemRefs.current[itemRefs.current.length - 1].current.focus();
      } else {
        itemRefs.current[index - 1].current.focus();
      }
    }

    // enter
    if (e.keyCode === 13) {
      itemRefs.current[index].current.click();
    }

    // ESC
    if (e.keyCode === 27) {
      setIsOpen(false);
    }
  };

  const MultipleDropDown = useMemo(() => {
    let selectedValue;
    if (selectedOption) {
      selectedValue = allOptions.filter(option => {
        return option.value === selectedOption;
      });
    }
    return (
      <Wrapper disabled={isDisabled} ref={wrapperRef}>
        <DropDownButton
          aria-controls={uniqueId}
          aria-expanded={isOpen}
          aria-haspopup
          disabled={isDisabled}
          onKeyDown={e => {
            if (e.keyCode === 40) {
              if (!itemRefs.current[0].current) return;
              itemRefs.current[0].current.focus();
            }
            if (e.keyCode === 27) {
              setIsOpen(false);
            }
            if (e.keyCode === 13 || e.keyCode === 32) {
              setIsOpen(true);
            }
          }}
          onMouseDown={openCloseMenu}
          role="combobox"
          type="button"
        >
          {selectedOption === null || !selectedOption
            ? 'Select Option'
            : selectedValue[0]?.label}
          <StyledIcon name="expand" />
        </DropDownButton>
        <DropDownMenu
          aria-label="Choose an option"
          id={uniqueId}
          isOpen={isOpen}
          role="listbox"
        >
          {allOptions &&
            allOptions.map((option, index) => {
              itemRefs.current[index] = itemRefs.current[index] || createRef();
              return (
                <span
                  aria-selected={option.value === selectedOption}
                  key={option.value}
                  onClick={() => onChange(option)}
                  onKeyDown={e => onKeyDown(e, index)}
                  ref={itemRefs.current[index]}
                  role="option"
                  tabIndex="-1"
                >
                  {option.label}
                </span>
              );
            })}
        </DropDownMenu>
      </Wrapper>
    );
  }, [allOptions, selectedOption, isOpen, isDisabled]);

  return MultipleDropDown;
};

export default DropComponent;

const getNodes = view => {
  const allNodes = DocumentHelpers.findInlineNodes(view.state.doc);
  const matchingOptionNodes = [];
  allNodes.forEach(node => {
    if (node.node.type.name === 'matching_option') {
      matchingOptionNodes.push(node);
    }
  });
  return matchingOptionNodes;
};

const getMatchingNode = (view, node) => {
  const allNodes = DocumentHelpers.findInlineNodes(view.state.doc);
  let matchingNode = '';
  allNodes.forEach(singleNode => {
    if (
      singleNode.node.type.name === 'matching_option' &&
      singleNode.node.attrs.id === node.attrs.id
    ) {
      matchingNode = singleNode.node;
    }
  });
  return matchingNode;
};
