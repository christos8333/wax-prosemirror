/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Switch from 'rc-switch';
import { grid, th } from '@pubsweet/ui-toolkit';

const Wrapper = styled.span`
  button {
    width: 65px;
  }

  .rc-switch-inner {
    left: 22px;
  }

  .rc-switch-checked {
    border: 1px solid ${th('colorPrimary')};
    background-color: ${th('colorPrimary')};

    .rc-switch-inner {
      left: 6px;
    }
    :after {
      left: 42px;
    }
  }
`;

const Label = styled.label`
  ${props =>
    props.labelPosition === 'left' &&
    css`
      margin-top: 4px;
      font-size: 14px;
      margin-right: ${grid(2)};
    `}

  ${props =>
    props.labelPosition === 'right' &&
    css`
      margin-top: 4px;
      font-size: 14px;
      margin-left: ${grid(2)};
    `}
    cursor: pointer;
`;

const SwitchComponent = props => {
  const { className, label, labelPosition, onChange, ...rest } = props;

  return (
    <Wrapper className={className}>
      {label && labelPosition === 'left' && (
        <Label labelPosition={labelPosition} onClick={onChange}>
          {label}
        </Label>
      )}

      <Switch onChange={onChange} {...rest} />

      {label && labelPosition === 'right' && (
        <Label labelPosition={labelPosition} onClick={onChange}>
          {label}
        </Label>
      )}
    </Wrapper>
  );
};

SwitchComponent.propTypes = {
  label: PropTypes.string,
  labelPosition: PropTypes.string,
  onChange: PropTypes.func,
  text: PropTypes.string,
};

SwitchComponent.defaultProps = {
  label: null,
  labelPosition: 'right',
  onChange: () => true,
  text: '',
};

export default SwitchComponent;
