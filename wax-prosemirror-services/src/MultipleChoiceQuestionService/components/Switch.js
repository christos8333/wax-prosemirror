/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Switch from 'rc-switch';
import { grid } from '@pubsweet/ui-toolkit';

const Wrapper = styled.span`
  button {
    width: 55px;
  }

  .rc-switch-inner {
    left: 31px;
  }

  .rc-switch-checked {
    border: 1px solid #008000;
    background-color: #008000;

    .rc-switch-inner {
      left: 6px;
    }
    :after {
      left: 33px;
    }
  }
`;

const Label = styled.span`
  ${props =>
    props.labelPosition === 'left' &&
    css`
      margin-right: ${grid(2)};
    `}

  ${props =>
    props.labelPosition === 'right' &&
    css`
      margin-left: ${grid(2)};
    `}
`;

const SwitchComponent = props => {
  const { className, label, labelPosition, ...rest } = props;

  return (
    <Wrapper className={className}>
      {label && labelPosition === 'left' && (
        <Label labelPosition={labelPosition}>{label}</Label>
      )}

      <Switch {...rest} />

      {label && labelPosition === 'right' && (
        <Label labelPosition={labelPosition}>{label}</Label>
      )}
    </Wrapper>
  );
};

SwitchComponent.propTypes = {
  label: PropTypes.string,
  labelPosition: PropTypes.string,
};

SwitchComponent.defaultProps = {
  label: null,
  labelPosition: 'right',
};

export default SwitchComponent;
