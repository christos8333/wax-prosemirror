import React, {
  useContext,
  useMemo,
  useRef,
  useState,
  createRef,
  useEffect,
} from 'react';
import styled from 'styled-components';
import {
  DocumentHelpers,
  WaxContext,
  ApplicationContext,
  Icon,
  useOnClickOutside,
} from 'wax-prosemirror-core';

const Wrapper = styled.div`
  display: flex;
  opacity: ${props => (props.disabled ? '0.4' : '1')};
`;

const ButtonWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const DropDownButton = styled.button`
  background: #fff;
  border: none;
  color: #000;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  width: 160px;

  span {
    position: relative;
    top: 2px;
  }
`;

const DropDownMenu = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  box-shadow: 0 0.2rem 0.4rem rgb(0 0 0 / 10%);
  display: flex;
  flex-direction: column;
  margin: 32px auto auto;
  max-height: 180px;
  overflow-y: auto;
  position: absolute;
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  width: 160px;
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
    cursor: not-allowed;
    opacity: 0.3;
  }
`;

const StyledIcon = styled(Icon)`
  height: 18px;
  margin-left: auto;
  width: 18px;
`;

const CustomBlockDropDownComponent = ({ view, item }) => {
  const { app } = useContext(ApplicationContext);
  const context = useContext(WaxContext);
  const {
    activeView,
    activeViewId,
    pmViews: { main },
  } = context;

  const customTagsConfig = app.config.get('config.CustomTagService');

  const configTags =
    customTagsConfig && customTagsConfig.tags ? customTagsConfig.tags : [];

  const blockTags = configTags.filter(tag => {
    return tag.tagType === 'block';
  });

  const [label, setLabel] = useState(null);
  const { state } = view;
  const { $from } = state.selection;

  const className = $from.parent.attrs.class ? $from.parent.attrs.class : '';

  const tagStatus = item.active(
    activeView.state,
    activeViewId,
    className,
    configTags,
  );

  const itemRefs = useRef([]);
  const wrapperRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const isEditable = main.props.editable(editable => {
    return editable;
  });

  let isDisabled = !item.select(state, activeViewId, activeView);
  if (!isEditable) isDisabled = true;

  useOnClickOutside(wrapperRef, () => setIsOpen(false));

  useEffect(() => {
    if (isDisabled) setIsOpen(false);
  }, [isDisabled]);

  useEffect(() => {
    const filteredStatus = blockTags.filter(
      tag => tagStatus[tag.label] === true,
    );

    if (filteredStatus?.length === 1) {
      setLabel(filteredStatus[0].label);
    } else {
      setLabel('Custom Block');
    }
  }, [tagStatus]);

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
        <ButtonWrapper>
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
        </ButtonWrapper>
        <DropDownMenu
          aria-label="Choose a custom block level action"
          id="custom-block-level-options"
          isOpen={isOpen}
          role="menu"
        >
          {blockTags.map((option, index) => {
            itemRefs.current[index] = itemRefs.current[index] || createRef();
            return (
              <option
                disabled={isDisabled}
                key={option.label}
                onClick={() => {
                  item.run(activeView.state, activeView.dispatch, option.label);

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
    [isDisabled, isOpen, label],
  );

  return MultipleDropDown;
};

export default CustomBlockDropDownComponent;
