import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import Icon from './Icon';

const activeStyles = css`
  background: gray;
  color: white;

  > svg {
    fill: white;
  }

  &:hover {
    background: gray;
  }
`;

const disabledStyles = css`
  cursor: not-allowed;

  > svg {
    fill: gainsboro;
  }

  &:hover {
    background: none;
  }
`;

const Wrapper = styled.button.attrs(props => ({
  title: props.title,
  type: 'button',
}))`
  align-items: center;
  background: none;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  display: flex;
  height: 24px;
  outline: none;
  padding: 0;
  /* padding: 4px 8px; */
  transition: all 0.1s ease-in;

  > svg {
    transition: all 0.1s ease-in;
  }

  &:hover {
    background: gainsboro;
  }

  ${props => props.active && activeStyles}
  ${props => props.disabled && disabledStyles}
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
    onClick,
  } = props;

  return (
    <Wrapper
      active={active}
      className={className}
      disabled={disabled}
      onClick={onClick}
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
