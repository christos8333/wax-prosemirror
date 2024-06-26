import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { th } from '@pubsweet/ui-toolkit';
import { icons } from 'wax-prosemirror-core';
import { isBoolean, keys } from 'lodash';
import SwitchComponent from './Switch';

// #region STYLED COMPONENTS ---------------------------------------------

export const ToggleInput = styled(SwitchComponent)`
  --width: 20px;
  --divisor: 2.1;
  --height: calc(var(--width) / var(--divisor));
  --padding: 1px;
  --border-width: 0px;
  --label-font-size: 12px;

  align-items: center;
  display: flex;
  gap: 10px;
  padding: 0.5rem 0.2rem;

  button {
    align-items: center;
    border-radius: calc(
      var(--height) + (var(--padding) * 2) + var(--border-width)
    );
    display: flex;
    height: fit-content;
    padding: var(--padding);
    transition: all 0.3s;
    width: var(--width);

    &:focus {
      box-shadow: none;
      outline: 1px solid #d5f1fd;
      outline-offset: 1px;
    }
  }

  label {
    color: var(--ai-tool-switch-label-color, #777);
    font-size: var(--label-font-size);
    margin: 0;
  }

  .rc-switch {
    border-width: var(--border-width);

    &::after {
      height: calc(var(--height) - (var(--padding) * 2));
      position: unset;
      transition: margin 0.2s cubic-bezier(0.35, 0, 0.25, 1);
      width: calc(var(--height) - (var(--padding) * 2));
    }
  }

  .rc-switch-checked {
    border: var(--border-width) solid ${th('colorPrimary')};

    &::after {
      border: none;
      margin-left: calc(var(--width) - var(--height));
    }
  }
`;

const SettingsContainer = styled.div`
  align-items: center;
  border-left: 1px solid #aaa;
  display: flex;
  gap: 5px;
  justify-content: space-between;
  margin-left: 10px;
  padding: 0 8px;
  width: fit-content;

  span {
    display: flex;
    gap: 5px;
  }
`;

const OptionButton = styled.button.attrs({ type: 'button' })`
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 0;

  > svg {
    fill: ${p => (p.$checked ? '#000' : '#aaa')};
    width: 18px;
  }
`;
// #endregion STYLED COMPONENTS ---------------------------------------------

const PromptOptions = ({ aiService, optionsState, setOption, options }) => {
  if (!options) return null;
  const onAiService = ({ key }) => keys(aiService).includes(key);
  const existentOptions = options.filter(onAiService);

  useEffect(() => {
    existentOptions.forEach(({ key }) => setOption(key, aiService[key]));
  }, []);

  return existentOptions ? (
    <SettingsContainer>
      {existentOptions.map(({ key, label, stateText, customIcon }) => {
        const value = optionsState[key];
        const Icon = customIcon || icons[key] || null;

        return (
          <OptionButton
            $checked={value}
            key={key}
            onClick={() => setOption(key, isBoolean(value) ? !value : value)}
            title={`${label}${stateText(value)}`}
          >
            {Icon ? <Icon /> : ''}
            {Icon ? '' : label}
          </OptionButton>
        );
      })}
    </SettingsContainer>
  ) : null;
};

PromptOptions.propTypes = {
  aiService: PropTypes.shape({}),
  optionsState: PropTypes.shape({}),
  setOption: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.string,
      stateText: PropTypes.func, // recieves the option state as the only arg, string expected
    }),
  ),
};
PromptOptions.defaultProps = {
  aiService: {},
  optionsState: {},
  setOption: () => {},
  options: [],
};

export default PromptOptions;
