import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Switch as AntSwitch } from 'antd';

import { grid } from '@pubsweet/ui-toolkit';

const Wrapper = styled.span``;

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

const Switch = props => {
  const { className, label, labelPosition, ...rest } = props;

  return (
    <Wrapper className={className}>
      {label && labelPosition === 'left' && (
        <Label labelPosition={labelPosition}>{label}</Label>
      )}

      <AntSwitch {...rest} />

      {label && labelPosition === 'right' && (
        <Label labelPosition={labelPosition}>{label}</Label>
      )}
    </Wrapper>
  );
};

Switch.propTypes = {
  label: PropTypes.string,
  labelPosition: PropTypes.string,
};

Switch.defaultProps = {
  label: null,
  labelPosition: 'right',
};

export default Switch;
