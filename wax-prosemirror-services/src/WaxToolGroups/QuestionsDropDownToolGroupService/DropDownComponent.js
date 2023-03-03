/* eslint-disable no-underscore-dangle */
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
import { WaxContext, Icon, useOnClickOutside } from 'wax-prosemirror-core';

const Wrapper = styled.div`
  opacity: ${props => (props.disabled ? '0.4' : '1')};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
`;

const DropDownButton = styled.button`
  background: #fff;
  border: none;
  color: #000;
  cursor: pointer;
  display: flex;
  position: relative;
  width: 215px;
  height: 100%;

  span {
    position: relative;
    top: 12px;
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
  margin: 2px auto auto;
  position: absolute;
  width: 220px;
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
  position: relative;
  top: 10px;
`;

const DropDownComponent = ({ view, tools }) => {
  const dropDownOptions = [
    {
      label: 'Multiple Choice',
      value: '0',
      item: tools[0],
    },
    {
      label: 'Multiple Choice (single correct)',
      value: '1',
      item: tools[1],
    },
    {
      label: 'True/False',
      value: '2',
      item: tools[2],
    },
    {
      label: 'True/False (single correct)',
      value: '3',
      item: tools[3],
    },
    {
      label: 'Matching',
      value: '4',
      item: tools[4],
    },
    {
      label: 'Essay',
      value: '5',
      item: tools[5],
    },
    {
      label: 'Multiple DropDown',
      value: '6',
      item: tools[6],
    },
    {
      label: 'Fill The Gap',
      value: '7',
      item: tools[7],
    },
  ];

  const context = useContext(WaxContext);
  const {
    activeView,
    activeViewId,
    pmViews: { main },
  } = context;
  const { state } = view;

  const itemRefs = useRef([]);
  const wrapperRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  useOnClickOutside(wrapperRef, () => setIsOpen(false));

  const [label, setLabel] = useState('Question Type');
  const isEditable = main.props.editable(editable => {
    return editable;
  });

  useEffect(() => {
    setLabel('Question Type');
    dropDownOptions.forEach(option => {
      if (option.item.active(main.state)) {
        setLabel(option.label);
      }
    });
  }, [activeViewId]);

  let isDisabled = !tools[0].select(state, activeView);

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

  if (!isEditable) isDisabled = false;

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

  const onChange = option => {
    tools[option.value].run(main, context);
    openCloseMenu();
  };

  const MultipleDropDown = useMemo(
    () => (
      <Wrapper disabled={isDisabled} ref={wrapperRef}>
        <DropDownButton
          aria-expanded={isOpen}
          aria-haspopup
          onKeyDown={e => {
            e.preventDefault();
            if (e.keyCode === 40) {
              itemRefs.current[0].current.focus();
            }
          }}
          onMouseDown={openCloseMenu}
          tabIndex="0"
          type="button"
        >
          <span>{label}</span> <StyledIcon name="expand" />
        </DropDownButton>
        <DropDownMenu isOpen={isOpen} role="menu">
          {dropDownOptions.map((option, index) => {
            itemRefs.current[index] = itemRefs.current[index] || createRef();
            return (
              <span
                key={option.value}
                onClick={() => onChange(option)}
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
    [isDisabled, isOpen, label],
  );

  return MultipleDropDown;
};

export default DropDownComponent;
