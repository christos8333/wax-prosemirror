/* eslint-disable no-underscore-dangle */
import React, {
  useContext,
  useMemo,
  useState,
  useEffect,
  useRef,
  createRef,
} from 'react';
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
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
  top: 9px;
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
  width: 160px;
  max-height: 180px;
  overflow-y: auto;
  z-index: 2;

  option {
    cursor: pointer;
    padding: 8px 10px;
  }

  option:focus,
  option:hover {
    background: #f2f9fc;
    outline: 2px solid #f2f9fc;
  }
  option:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const StyledIcon = styled(Icon)`
  height: 18px;
  width: 18px;
  margin-left: auto;
`;

const BlockDropDownComponent = ({ view, tools }) => {
  const { t, i18n } = useTranslation();
  const context = useContext(WaxContext);
  const {
    activeView,
    activeViewId,
    pmViews: { main },
  } = context;

  const translatedLabel = (translation, defaultLabel) => {
    return !isEmpty(i18n) && i18n.exists(translation)
      ? t(translation)
      : defaultLabel;
  };

  const [label, setLabel] = useState(null);

  const dropDownOptions = [
    {
      label: translatedLabel(`Wax.BlockLevel.Title (H1)`, 'Title'),
      value: '0',
      item: tools[0],
    },
    {
      label: translatedLabel(`Wax.BlockLevel.Heading 2`, 'Heading 2'),
      value: '5',
      item: tools[5],
    },
    {
      label: translatedLabel(`Wax.BlockLevel.Heading 3`, 'Heading 3'),
      value: '6',
      item: tools[6],
    },
    {
      label: translatedLabel(`Wax.BlockLevel.Paragraph`, 'Paragraph'),
      value: '8',
      item: tools[8],
    },
    {
      label: translatedLabel(`Wax.BlockLevel.Block Quote`, 'Block Quote'),
      value: '13',
      item: tools[13],
    },
  ];

  const itemRefs = useRef([]);
  const wrapperRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const isEditable = main.props.editable(editable => {
    return editable;
  });

  const isDisabled = !isEditable;

  useOnClickOutside(wrapperRef, () => setIsOpen(false));

  useEffect(() => {
    if (isDisabled) setIsOpen(false);
  }, [isDisabled]);

  useEffect(() => {
    setLabel(translatedLabel('Wax.BlockLevel.Block Level', 'Heading styles'));
    dropDownOptions.forEach(option => {
      if (option.item.active(main.state, activeViewId)) {
        setTimeout(() => {
          setLabel(
            translatedLabel(
              `Wax.BlockLevel.${option.item.label}`,
              option.item.label,
            ),
          );
        });
      }
    });
  }, [
    main.state.selection.$from.parent.type.name,
    t('Wax.BlockLevel.Paragraph'),
  ]);

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

  const MultipleDropDown = useMemo(
    () => (
      <Wrapper disabled={isDisabled} ref={wrapperRef}>
        <DropDownButton
          aria-controls="block-level-options"
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
          <span>{label}</span>
          <StyledIcon name="expand" />
        </DropDownButton>
        <DropDownMenu
          aria-label="Choose a block level action"
          id="block-level-options"
          isOpen={isOpen}
          role="menu"
        >
          {dropDownOptions.map((option, index) => {
            itemRefs.current[index] = itemRefs.current[index] || createRef();
            return (
              <option
                disabled={
                  !tools[option.value].select(
                    main.state,
                    activeViewId,
                    activeView,
                  )
                }
                key={option.value}
                onClick={() => {
                  tools[option.value].run(main.state, main.dispatch);

                  openCloseMenu();
                }}
                onKeyDown={e => onKeyDown(e, index)}
                ref={itemRefs.current[index]}
                role="menuitem"
                tabIndex="-1"
              >
                {option.label}
              </option>
            );
          })}
        </DropDownMenu>
      </Wrapper>
    ),
    [isDisabled, isOpen, label, t('Wax.BlockLevel.Paragraph')],
  );

  return MultipleDropDown;
};

export default BlockDropDownComponent;
