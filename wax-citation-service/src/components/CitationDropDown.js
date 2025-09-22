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
import { WaxContext, Icon, useOnClickOutside, PortalContext } from 'wax-prosemirror-core';

const Wrapper = styled.div`
  opacity: ${props => (props.disabled ? '0.4' : '1')};
  display: flex;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  background: #fff;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  box-shadow: 0 0.2rem 0.4rem rgb(0 0 0 / 10%);
  margin: 29px auto auto;
  position: absolute;
  width: 170px;
  max-height: 180px;
  overflow-y: scroll;
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

const CitationDropDown = ({ item }) => {
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
          defaultTrans="American Psychological Association"
          label="Wax.Citation.APA"
        />
      ),
      value: 'APA',
    },
    {
      label: (
        <Translation
          defaultTrans="Modern Language Association"
          label="Wax.Citation.MLA"
        />
      ),
      value: 'MLA',
    },
    {
      label: (
        <Translation
          defaultTrans="Chicago Author–Date"
          label="Wax.Citation.Chicago"
        />
      ),
      value: 'chicago',
    },
    {
      label: <Translation defaultTrans="Harvard" label="Wax.Tables.Harvard" />,
      value: 'harvard',
    },
    {
      label: (
        <Translation defaultTrans="Vancouver" label="Wax.Tables.Vancouver" />
      ),
      value: 'vancouver',
    },
    {
      label: <Translation defaultTrans="IEEE" label="Wax.Tables.IEEE" />,
      value: 'ieee',
    },
  ];

  const context = useContext(WaxContext);
  const { activeView } = context;
  const { setCitationFormat } = useContext(PortalContext);
  const itemRefs = useRef([]);
  const wrapperRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  // const isDisabled = !item.select(activeView.state);
  const isDisabled = false;

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

  const CitationDropDownComponent = useMemo(
    () => (
      <Wrapper disabled={isDisabled} ref={wrapperRef}>
        <ButtonWrapper>
          <DropDownButton
            aria-controls="citation-options"
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
              {!isEmpty(i18n) && i18n.exists('Wax.Tables.Citation display')
                ? t('Wax.Tables.Citation display')
                : 'Citation display'}
            </span>
            <StyledIcon name="expand" />
          </DropDownButton>
        </ButtonWrapper>
        <DropDownMenu
          aria-label="Choose a citation option"
          id="citation-options"
          isOpen={isOpen}
          role="menu"
        >
          {dropDownOptions.map((option, index) => {
            itemRefs.current[index] = itemRefs.current[index] || createRef();
            return (
              <span
                key={option.value}
                onClick={() => {
                  setCitationFormat(option.value);
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

  return CitationDropDownComponent;
};

export default CitationDropDown;
