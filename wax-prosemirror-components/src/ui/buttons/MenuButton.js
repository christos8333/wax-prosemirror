import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { th, override } from '@pubsweet/ui-toolkit';

import Icon from './Icon';

const activeStyles = css`
  background: ${th('colorPrimary')};
  color: ${th('colorTextReverse')};

  > svg {
    fill: ${th('colorTextReverse')};
  }

  &:hover {
    background: ${th('colorPrimary')};
  }
`;

const disabledStyles = css`
  cursor: not-allowed;
  opacity: 0.4;

  &:hover {
    background: none;
  }
`;

const Wrapper = styled.button.attrs(props => ({
  title: props.title,
  type: 'button',
}))`
  background: none;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  font-family: ${th('fontInterface')};
  font-size: ${th('fontSizeBase')};
  height: 28px;
  outline: none;
  padding: 2px;
  transition: all 0.1s ease-in;
  color: ${th('colorText')};

  > svg {
    transition: all 0.1s ease-in;
  }

  &:hover {
    background: ${th('colorBackgroundHue')};
  }

  ${props => props.active && activeStyles}
  ${props => props.disabled && disabledStyles}

  ${override('Wax.MenuButton')}
`;

const StyledIcon = styled(Icon)`
  height: 24px;
  width: 24px;
`;

const Label = styled.span`
  margin: 0 8px;
  ${props => props.hasIcon && `margin: 0 8px 0 4px;`}
`;

const MenuButton = props => {
  const {
    active,
    className,
    disabled,
    iconName,
    label,
    title,
    onMouseDown,
  } = props;
  return (
    <Wrapper
      active={active}
      className={className}
      disabled={disabled}
      onMouseDown={onMouseDown}
      title={title}
    >
      {iconName && (
        <StyledIcon active={active} disabled={disabled} name={iconName} />
      )}

      {label && <Label hasIcon={!!iconName}>{label}</Label>}
    </Wrapper>
  );
};

MenuButton.propTypes = {
  active: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  iconName: PropTypes.string,
  label: PropTypes.string,
  title: PropTypes.string,
};

MenuButton.defaultProps = {
  iconName: null,
  label: null,
  title: null,
};

export default MenuButton;
