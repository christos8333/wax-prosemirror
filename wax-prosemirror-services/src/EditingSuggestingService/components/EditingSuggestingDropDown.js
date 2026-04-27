/* eslint react/prop-types: 0 */
import React, { useMemo, useContext, useState, useRef, createRef } from 'react';
import styled from 'styled-components';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import {
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
  margin: 29px auto auto;
  position: absolute;
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  width: 170px;
  z-index: 2;

  span {
    cursor: pointer;
    padding: 8px 10px;
    display: flex;
    align-items: center;
  }

  span:focus,
  span:hover {
    background: #f2f9fc;
    outline: 2px solid #f2f9fc;
  }
`;

const StyledIcon = styled(Icon)`
  height: 18px;
  margin-left: auto;
  width: 18px;
`;

const OptionIcon = styled(Icon)`
  height: 16px;
  margin-right: 5px;
  width: 16px;
`;

// eslint-disable-next-line no-unused-vars
const EditingSuggesting = ({ view: { dispatch, state }, item }) => {
  const { activeView, pmViews } = useContext(WaxContext);
  const { app } = useContext(ApplicationContext);
  const { t, i18n } = useTranslation();
  const enableService = app.config.get('config.EnableTrackChangeService')
    ? app.config.get('config.EnableTrackChangeService')
    : { toggle: false };
  const isDisabled = !enableService.toggle;

  const isEditable = pmViews.main.props.editable(editable => {
    return editable;
  });

  const itemRefs = useRef([]);
  const wrapperRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  useOnClickOutside(wrapperRef, () => setIsOpen(false));

  const enableDisableTrackChanges = () => {
    enableService.enabled = !enableService.enabled;
    if (enableService.updateTrackStatus)
      enableService.updateTrackStatus(enableService.enabled);

    setTimeout(() => {
      activeView.focus();
    }, 100);
  };

  const getCurrentModeLabel = () => {
    if (enableService.enabled) {
      return (
        <>
          <OptionIcon name="suggesting" />
          {!isEmpty(i18n) && i18n.exists(`Wax.TrackChanges.Suggesting`)
            ? t(`Wax.TrackChanges.Suggesting`)
            : 'Suggesting'}
        </>
      );
    }
    return (
      <>
        <OptionIcon name="editing" />
        {!isEmpty(i18n) && i18n.exists(`Wax.TrackChanges.Editing`)
          ? t(`Wax.TrackChanges.Editing`)
          : 'Editing'}
      </>
    );
  };

  const dropDownOptions = [
    {
      label: (
        <>
          <OptionIcon name="editing" />
          {!isEmpty(i18n) && i18n.exists(`Wax.TrackChanges.Editing`)
            ? t(`Wax.TrackChanges.Editing`)
            : 'Editing'}
        </>
      ),
      value: 'editing',
    },
    {
      label: (
        <>
          <OptionIcon name="suggesting" />
          {!isEmpty(i18n) && i18n.exists(`Wax.TrackChanges.Suggesting`)
            ? t(`Wax.TrackChanges.Suggesting`)
            : 'Suggesting'}
        </>
      ),
      value: 'suggesting',
    },
  ];

  const openCloseMenu = () => {
    if (!isDisabled) setIsOpen(!isOpen);
    if (isOpen) {
      setTimeout(() => {
        pmViews.main.focus();
      });
    }
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

  const Viewing = () => {
    return (
      <span>
        <OptionIcon name="viewing" />
        {!isEmpty(i18n) && i18n.exists(`Wax.TrackChanges.Viewing`)
          ? t(`Wax.TrackChanges.Viewing`)
          : 'Viewing'}
      </span>
    );
  };

  const EditingSuggestingComponent = useMemo(
    () => (
      <Wrapper disabled={isDisabled} ref={wrapperRef}>
        <ButtonWrapper>
          <DropDownButton
            aria-controls="editing-suggesting-options"
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
            <span>{getCurrentModeLabel()}</span>
            <StyledIcon name="expand" />
          </DropDownButton>
        </ButtonWrapper>
        <DropDownMenu
          aria-label="Choose editing or suggesting mode"
          id="editing-suggesting-options"
          isOpen={isOpen}
          role="menu"
        >
          {dropDownOptions.map((option, index) => {
            itemRefs.current[index] = itemRefs.current[index] || createRef();
            const isSelected =
              (option.value === 'suggesting' && enableService.enabled) ||
              (option.value === 'editing' && !enableService.enabled);
            return (
              <span
                key={option.value}
                onClick={() => {
                  if (option.value === 'suggesting' && !enableService.enabled) {
                    enableDisableTrackChanges();
                  } else if (
                    option.value === 'editing' &&
                    enableService.enabled
                  ) {
                    enableDisableTrackChanges();
                  }
                  openCloseMenu();
                }}
                onKeyDown={e => onKeyDown(e, index)}
                ref={itemRefs.current[index]}
                role="menuitem"
                style={{
                  backgroundColor: isSelected ? '#e3f2fd' : 'transparent',
                  fontWeight: isSelected ? 'bold' : 'normal',
                }}
                tabIndex="-1"
              >
                {option.label}
              </span>
            );
          })}
        </DropDownMenu>
      </Wrapper>
    ),
    [isDisabled, isOpen, enableService.enabled, t, i18n],
  );

  if (!isEditable) return <Viewing />;

  return EditingSuggestingComponent;
};

export default EditingSuggesting;
