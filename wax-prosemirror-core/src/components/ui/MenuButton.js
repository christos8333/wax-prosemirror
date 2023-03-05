import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { th, override } from '@pubsweet/ui-toolkit';
import icons from '../icons/icons';

const disabledStyles = css`
  background: ${props =>
    props.active ? `${th('colorPrimary')}` : 'transparent'};
  cursor: not-allowed;
  opacity: 0.4;

  &:hover {
    background: ${props =>
      props.active ? `${th('colorPrimary')}` : 'transparent'};
  }
`;

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

const Wrapper = styled.button.attrs(props => ({
  title: props.title,
  type: 'button',
}))`
  background: none;
  border: none;
  border-radius: 2px;
  color: ${th('colorText')};
  cursor: pointer;
  font-family: ${th('fontInterface')};
  font-size: ${th('fontSizeBase')};
  height: 28px;
  outline: none;
  padding: 2px;
  transition: all 0.1s ease-in;
  user-select: none;

  > svg {
    transition: all 0.1s ease-in;
  }

  &:hover {
    background: ${th('colorBackgroundHue')};
  }

  /* stylelint-disable-next-line order/properties-alphabetical-order */
  ${props => props.active && activeStyles}
  ${props => props.disabled && disabledStyles}

  ${override('Wax.MenuButton')}
`;

// const StyledIcon = styled(Icon)`
//   height: 24px;
//   width: 24px;
// `;

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

  let Component = icons[iconName];

  if (typeof iconName === 'function') {
    Component = iconName;
  }

  return (
    <Wrapper
      active={active}
      aria-pressed={active || false}
      className={className}
      disabled={disabled}
      onMouseDown={onMouseDown}
      title={title}
    >
      {iconName && <Component className={className} />}

      {label && <Label hasIcon={!!iconName}>{label}</Label>}
    </Wrapper>
  );
};

MenuButton.propTypes = {
  active: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  iconName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  label: PropTypes.string,
  title: PropTypes.string,
};

MenuButton.defaultProps = {
  iconName: null,
  label: null,
  title: null,
};

export default MenuButton;
