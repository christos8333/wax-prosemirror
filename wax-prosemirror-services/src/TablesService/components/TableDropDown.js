/* eslint react/prop-types: 0 */
import React, {
  useMemo,
  useContext,
  useState,
  useEffect,
  useRef,
  createRef,
} from 'react';
import styled from 'styled-components';
import * as tablesFn from 'prosemirror-tables';
import { WaxContext, Icon, useOnClickOutside } from 'wax-prosemirror-core';

const Wrapper = styled.div`
  opacity: ${props => (props.disabled ? '0.4' : '1')};
`;

const DropDownButton = styled.button`
  background: #fff;
  border: none;
  color: #000;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
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
  overflow-y: scroll;
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

const TableDropDown = ({ item }) => {
  const dropDownOptions = [
    { label: 'Add column before', value: 'addColumnBefore' },
    { label: 'Add column after', value: 'addColumnAfter' },
    { label: 'Delete column', value: 'deleteColumn' },
    { label: 'Insert row before', value: 'addRowBefore' },
    { label: 'Insert row after', value: 'addRowAfter' },
    { label: 'Delete row', value: 'deleteRow' },
    { label: 'Delete table', value: 'deleteTable' },
    { label: 'Merge cells', value: 'mergeCells' },
    { label: 'Split cell', value: 'splitCell' },
    { label: 'Toggle header column', value: 'toggleHeaderColumn' },
    { label: 'Toggle header row', value: 'toggleHeaderRow' },
    { label: 'Toggle header cells', value: 'toggleHeaderCell' },
  ];

  const { activeView } = useContext(WaxContext);
  const itemRefs = useRef([]);
  const wrapperRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const isDisabled = !item.select(activeView.state);

  useOnClickOutside(wrapperRef, () => setIsOpen(false));

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
    // arrow down
    if (e.keyCode === 40) {
      if (index === itemRefs.current.length - 1) {
        itemRefs.current[0].current.focus();
      } else {
        itemRefs.current[index + 1].current.focus();
      }
    }

    // arrow up
    if (e.keyCode === 38) {
      if (index === 0) {
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
      openCloseMenu();
    }
  };

  const TableDropDownComponent = useMemo(
    () => (
      <Wrapper disabled={isDisabled} ref={wrapperRef}>
        <DropDownButton
          aria-expanded={isOpen}
          aria-haspopup
          disabled={isDisabled}
          onKeyDown={e => {
            e.preventDefault();
            if (e.keyCode === 40) {
              itemRefs.current[0].current.focus();
            }
            if (e.keyCode === 27) {
              openCloseMenu();
            }
          }}
          onMouseDown={openCloseMenu}
          type="button"
        >
          <span>Table Options</span> <StyledIcon name="expand" />
        </DropDownButton>
        <DropDownMenu isOpen={isOpen} role="menu">
          {dropDownOptions.map((option, index) => {
            itemRefs.current[index] = itemRefs.current[index] || createRef();
            return (
              <span
                key={option.value}
                onClick={() => {
                  item.run(
                    activeView.state,
                    activeView.dispatch,
                    tablesFn[option.value],
                  );

                  openCloseMenu();
                }}
                onKeyDown={e => onKeyDown(e, index)}
                ref={itemRefs.current[index]}
                role="menuitem"
                tabIndex="-1"
              >
                {option.label}
              </span>
            );
          })}
        </DropDownMenu>
      </Wrapper>
    ),
    [isDisabled, isOpen],
  );

  return TableDropDownComponent;
};

export default TableDropDown;
