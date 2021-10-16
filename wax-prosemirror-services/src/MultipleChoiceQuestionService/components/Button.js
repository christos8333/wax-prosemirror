import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Button as AntButton } from 'antd';
import { omit } from 'lodash';

import { darken, lighten } from '@pubsweet/ui-toolkit';

const colors = {
  danger: 'colorError',
  error: 'colorError',
  success: 'colorSuccess',
  // warn: 'colorWarning',
};

const StyledButton = styled(AntButton)`
  ${props => {
    const { status, theme, type } = props;
    if (!Object.keys(colors).includes(status)) return null;
    const color = theme[colors[status]];

    // primary
    if (type === 'primary')
      return css`
        background-color: ${color};
        border-color: ${color};
        color: ${theme.colorTextReverse};

        &:hover,
        &:focus,
        &:active {
          border-color: ${color};
          color: ${theme.colorTextReverse};
        }

        &:hover,
        &:focus {
          background-color: ${lighten(color, 0.25)};
        }

        &:active {
          background-color: ${darken(color, 0.25)};
        }
      `;

    // non-primary
    return css`
      color: ${color};
      border-color: ${color};
      &:hover,
      &:focus {
        color: ${lighten(color, 0.25)};
        border-color: ${lighten(color, 0.25)};
      }

      &:active {
        color: ${darken(color, 0.25)};
        border-color: ${darken(color, 0.25)};
      }
    `;
  }}
`;
/**
 * API is the same as https://ant.design/components/button/#API, except for the
 * `danger` prop, which is ommited in favour of `status`, described below.
 */

const Button = props => {
  const { children, className, ...rest } = props;
  const passProps = omit(rest, 'danger');

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <StyledButton className={className} {...passProps}>
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  status: PropTypes.oneOf(['error', 'danger', 'success']),
};

Button.defaultProps = {
  status: null,
};

export default Button;
