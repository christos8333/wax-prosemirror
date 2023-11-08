/* eslint-disable no-underscore-dangle */
import React, {
  useContext,
  useMemo,
  useEffect,
  useState,
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

const Wrapper = styled.div`
  display: inline-flex;
`;

const DropDownButton = styled.button`
  background: #fff;
  border: 1px solid rgb(204, 204, 204);
  color: #000;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  display: inline-flex;
  opacity: ${props => (props.disabled ? `0.4` : `1`)};
  padding: 8px 4px 4px 4px;
  position: relative;
  width: 165px;

  span {
    position: relative;
    top: 2px;
  }
  &focus {
    outline: 0;
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
  margin: 35px auto auto;
  position: absolute;
  width: 170px;
  max-height: 150px;
  overflow-y: auto;
  z-index: 2;

  span {
    cursor: pointer;
    padding: 8px 10px;
  }

  span:focus,
  span:hover {
    background: #f2f9fc;
    outline: 2px solid #f2f9fc;
  }
`;

const StyledIcon = styled(Icon)`
  height: 18px;
  width: 18px;
  margin-left: auto;
`;

const DropComponent = ({ getPos, node, uniqueId }) => {
  const [selectedOption, setSelectedOption] = useState(undefined);

  const itemRefs = useRef([]);
  const wrapperRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const context = useContext(WaxContext);
  const {
    pmViews: { main },
  } = context;

  const customProps = main.props.customValues;
  const { testMode } = customProps;

  let isDisabled = false;
  if (node.attrs.options.length === 0 || !testMode) isDisabled = true;

  useEffect(() => {
    const currentOption = node.attrs.options.filter(option => {
      return option.value === node.attrs.correct;
    });
    if (!testMode && currentOption[0])
      setSelectedOption(currentOption[0].value);
  }, []);

  const onChange = option => {
    const allNodes = getNodes(main);
    const { tr } = main.state;
    allNodes.forEach(singleNode => {
      if (singleNode.node.attrs.id === node.attrs.id) {
        tr.setNodeMarkup(singleNode.pos, undefined, {
          ...singleNode.node.attrs,
          answer: option.value,
        });
      }
    });
    main.dispatch(tr);
    openCloseMenu();
    setSelectedOption(option.value);
  };

  useOnClickOutside(wrapperRef, () => setIsOpen(false));

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

  const openCloseMenu = () => {
    if (!isDisabled) setIsOpen(!isOpen);
  };

  const MultipleDropDown = useMemo(() => {
    let selectedValue;
    if (selectedOption) {
      selectedValue = node.attrs.options.filter(option => {
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
            : selectedValue[0].label}
          <StyledIcon name="expand" />
        </DropDownButton>
        <DropDownMenu
          aria-label="Choose an option"
          id={uniqueId}
          isOpen={isOpen}
          role="listbox"
        >
          {node.attrs.options.map((option, index) => {
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
  }, [node.attrs.options, selectedOption, isOpen]);

  return MultipleDropDown;
};

export default DropComponent;

const getNodes = view => {
  return DocumentHelpers.findInlineNodes(view.state.doc);
};
