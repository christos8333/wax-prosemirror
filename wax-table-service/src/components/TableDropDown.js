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
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash';
import { WaxContext, Icon, useOnClickOutside } from 'wax-prosemirror-core';
import * as tablesFn from '../tableSrc';

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
  max-height: 180px;
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
  const { t, i18n } = useTranslation();
  const Translation = ({ label, defaultTrans }) => {
    return (
      <>{!isEmpty(i18n) && i18n.exists(label) ? t(label) : defaultTrans}</>
    );
  };

  const dropDownOptions = [
    {
      label: (
        <Translation
          defaultTrans="Delete table"
          label="Wax.Tables.Delete table"
        />
      ),
      value: 'deleteTable',
    },
    {
      label: (
        <Translation
          defaultTrans="Add Caption"
          label="Wax.Tables.Add Caption"
        />
      ),
      value: 'addCaption',
    },
    {
      label: (
        <Translation
          defaultTrans="Delete Caption"
          label="Wax.Tables.Delete Caption"
        />
      ),
      value: 'deleteCaption',
    },
    {
      label: (
        <Translation
          defaultTrans="Add column before"
          label="Wax.Tables.Add column before"
        />
      ),
      value: 'addColumnBefore',
    },
    {
      label: (
        <Translation
          defaultTrans="Add column after"
          label="Wax.Tables.Add column after"
        />
      ),
      value: 'addColumnAfter',
    },
    {
      label: (
        <Translation
          defaultTrans="Delete column"
          label="Wax.Tables.Delete column"
        />
      ),
      value: 'deleteColumn',
    },
    {
      label: (
        <Translation
          defaultTrans="Insert row before"
          label="Wax.Tables.Insert row before"
        />
      ),
      value: 'addRowBefore',
    },
    {
      label: (
        <Translation
          defaultTrans="Insert row after"
          label="Wax.Tables.Insert row after"
        />
      ),
      value: 'addRowAfter',
    },
    {
      label: (
        <Translation defaultTrans="Delete row" label="Wax.Tables.Delete row" />
      ),
      value: 'deleteRow',
    },
    {
      label: (
        <Translation
          defaultTrans="Merge cells"
          label="Wax.Tables.Merge cells"
        />
      ),
      value: 'mergeCells',
    },
    {
      label: (
        <Translation defaultTrans="Split cell" label="Wax.Tables.Split cell" />
      ),
      value: 'splitCell',
    },
    {
      label: (
        <Translation
          defaultTrans="Toggle header column"
          label="Wax.Tables.Toggle header column"
        />
      ),
      value: 'toggleHeaderColumn',
    },
    {
      label: (
        <Translation
          defaultTrans="Toggle header row"
          label="Wax.Tables.Toggle header row"
        />
      ),
      value: 'toggleHeaderRow',
    },
    {
      label: (
        <Translation
          defaultTrans="Toggle header cells"
          label="Wax.Tables.Toggle header cells"
        />
      ),
      value: 'toggleHeaderCell',
    },
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
      setIsOpen(false);
    }
  };

  const TableDropDownComponent = useMemo(
    () => (
      <Wrapper disabled={isDisabled} ref={wrapperRef}>
        <DropDownButton
          aria-controls="table-options"
          aria-expanded={isOpen}
          aria-haspopup
          disabled={isDisabled}
          onKeyDown={e => {
            if (e.keyCode === 40) {
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
          type="button"
        >
          <span>
            {!isEmpty(i18n) && i18n.exists('Wax.Tables.Table Options')
              ? t('Wax.Tables.Table Options')
              : 'Table Options'}
          </span>
          <StyledIcon name="expand" />
        </DropDownButton>
        <DropDownMenu
          aria-label="Choose a table action"
          id="table-options"
          isOpen={isOpen}
          role="menu"
        >
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
    [isDisabled, isOpen, t('Wax.Tables.Table Options')],
  );

  return TableDropDownComponent;
};

export default TableDropDown;
