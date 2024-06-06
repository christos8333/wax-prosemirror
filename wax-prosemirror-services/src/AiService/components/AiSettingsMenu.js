import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { th } from '@pubsweet/ui-toolkit';
import { WaxContext } from 'wax-prosemirror-core';
import { keys } from 'lodash';
import SwitchComponent from './Switch';

// #region CONSTANTS ---------------------------------------------
const LABEL_POS = 'left';

const SETTINGS = [
  {
    key: 'AskKb',
    label: 'Ask knowledge base',
  },
  {
    key: 'CustomPromptsOn',
    label: 'Custom prompts',
  },
  {
    key: 'GenerateImages',
    label: 'Generate image',
  },
];
// #endregion CONSTANTS ---------------------------------------------

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

const SettingsDropdown = styled.ul`
  --item-height: var(--ai-settings-menu-height, 30px);
  --items-length: ${p => p.$listlng};
  --max-height: calc(var(--item-height) * var(--items-length));

  background-color: #f8f8f8;
  border: ${p => (p.$show ? 'var(--ai-tool-border)' : '0 solid #0000')};
  border-radius: 0 0 0.3rem 0.3rem;
  border-top: none;
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  max-height: ${p => (p.$show ? 'var(--max-height)' : 0)};
  overflow: hidden;
  padding: 0 0.5rem;
  position: absolute;
  right: calc(-1 * var(--ai-tool-border-width));
  top: calc(100% + var(--ai-tool-border-width));
  transition: all ${p => `${0.15 * p.$listlng}s`};
  z-index: 15;

  > li {
    align-items: center;
    display: flex;
    height: var(--item-height);
    justify-content: ${LABEL_POS === 'right' ? 'flex-start' : 'flex-end'};
    padding: 0;
    user-select: none;
  }

  > li:not(:first-child) {
    border-top: 1px solid #0001;
  }
`;
// #endregion STYLED COMPONENTS ---------------------------------------------

const AiSettingsMenu = ({ show, aiService, optionsState, setOptionsState }) => {
  const ctx = useContext(WaxContext);

  const onAiService = ({ key }) => keys(aiService).includes(key);

  const enabledSettings = SETTINGS.filter(onAiService).map(setting => ({
    ...setting,
    type: typeof aiService[setting.key],
  }));

  useEffect(() => {
    enabledSettings.forEach(({ key }) => setOption(key, aiService[key]));
  }, []);

  const setOption = (key, state) => {
    ctx.setOption({ [key]: state });
    setOptionsState(prev => ({
      ...prev,
      [key]: state,
    }));
  };

  const handlers = (key, type, value) => {
    const typeBasedHandlers = {
      boolean: () => {
        setOption(key, !value);
      },
    };
    return typeBasedHandlers[type] ?? (() => {});
  };

  const renderSettings = ({ key, label, type }) => {
    const value = optionsState[key];
    const typeBasedSettingUI = {
      boolean: (
        <li key={key}>
          <ToggleInput
            checked={optionsState[key]}
            label={label}
            labelPosition={LABEL_POS}
            onChange={handlers(key, type, value)}
          />
        </li>
      ),
    };

    return typeBasedSettingUI[type] ?? typeBasedSettingUI.boolean;
  };

  return (
    <SettingsDropdown
      $listlng={enabledSettings.length}
      $show={show}
      onClick={e => e.stopPropagation()} // to prevent !showSettings
    >
      {enabledSettings?.map(renderSettings)}
    </SettingsDropdown>
  );
};

AiSettingsMenu.propTypes = {
  show: PropTypes.bool,
  aiService: PropTypes.shape({}),
  optionsState: PropTypes.shape({}),
  setOptionsState: PropTypes.func,
};
AiSettingsMenu.defaultProps = {
  show: false,
  aiService: {},
  optionsState: {},
  setOptionsState: () => {},
};

export default AiSettingsMenu;
