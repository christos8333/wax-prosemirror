/* stylelint-disable no-descending-specificity */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useLayoutEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { capitalize, debounce, isEmpty, keys } from 'lodash';
import { useTranslation } from 'react-i18next';
import { WaxContext, icons } from 'wax-prosemirror-core';
import { PropTypes } from 'prop-types';
import replaceSelectedText from '../ReplaceSelectedText';
import PromptOptions from './AiSettingsMenu';
import {
  safeParse,
  resultsToHtml,
  getUpdatedPosition,
  copyTextContent,
} from '../helpers';

const AI_TOOL_ID = 'ai-overlay';
const DEFAULT_KEY = 'content';
const OPTIONS = {
  prompt: [
    {
      key: 'AskKb',
      label: 'Ask knowledge base',
      stateText: val => (val ? ' (enabled)' : ' (disabled)'),
    },
    {
      key: 'GenerateImages',
      label: 'Generate image',
      stateText: val => (val ? '' : ''),
    },
  ],
};

// #region STYLED COMPONENTS ------------------------------------------------

// #region MAIN & MISC-------------------

const Root = styled.div`
  --ai-tool-result-max-height: ${p => (p.$fullScreen ? '100%' : '500px')};
  --ai-tool-result-height: ${p => (p.$fullScreen ? '100%' : 'fit-content')};
  --ai-tool-width: 100%;
  --ai-tool-border-width: 1px;
  --ai-tool-border: var(--ai-tool-border-width) solid #333;
  align-items: flex-end;
  background: #fff;
  border: var(--ai-tool-border);
  display: flex;
  flex-direction: column;
  height: ${p => (p.$fullScreen ? '100%' : 'unset')};
  margin: 0 10px 10px;
  max-width: 97.5%;
  min-width: 600px;
  width: var(--ai-tool-width);

  div {
    ::-webkit-scrollbar {
      height: 5px;
      width: 5px;
    }

    ::-webkit-scrollbar-thumb {
      background: var(--scrollbar-color, #3334);
      width: 5px;
    }

    ::-webkit-scrollbar-track {
      background: #fff0;
      padding: 5px;
    }
  }
`;
const Heading = styled.header`
  --gradient-direction: to bottom;
  align-items: center;
  background: linear-gradient(
    var(--gradient-direction, to bottom),
    #dadada 0%,
    #f5f5f5 3%
  );
  /* border-block: var(--ai-tool-border); */
  display: flex;
  height: 25px;
  margin: 0;
  padding-left: 3px;
  width: 100%;
`;
const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const ButtonBase = styled.button.attrs({ type: 'button' })`
  align-items: center;
  background: none;
  border: none;
  cursor: ${p => (p.disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  justify-content: center;
  margin: 0;
  opacity: ${p => (p.disabled ? '0.4' : '1')};
  outline: none;
  user-select: none;
`;
const MainHeading = styled(Heading)`
  background: #333;
  border: none;
  color: white;
  height: 60px; /* to avoid clipping */
  justify-content: space-between;
  max-height: 30px;

  svg {
    fill: #fff;
  }

  > :first-child {
    align-items: center;
    display: flex;
    gap: 5px;
    justify-content: center;
    line-height: 0.5;
    padding-left: 5px;

    svg {
      height: 18px;
      width: 18px;
    }
  }
`;

// #endregion MAIN & MISC----------------

// #region FORM -------------------------

const AskAIForm = styled(FlexCol)`
  align-self: center;
  background: #fff;
  border: var(--ai-tool-border);
  border-color: #aaa;
  border-radius: 2rem;
  display: ${p => (p.$show ? 'flex' : 'none')};
  margin-block: 13px;
  padding: 8px 15px;
  position: relative;
  width: 91%;
`;

const PromptInput = styled.input`
  background: transparent;
  border: none;
  color: #555;
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  outline: none;
  width: 100%;
`;

const SendButton = styled(ButtonBase)`
  --ai-tool-icon-color: #333;
  margin-bottom: 3px;
  padding: 0 0 0 5px;
  transform: scale(1.3);
`;

// #endregion FORM --------------------------

// #region RESULT -----------------------

const ResultContainer = styled.div`
  align-items: center;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 0;
  height: var(--ai-tool-result-height);
  justify-content: flex-start;
  max-height: ${p => (p.$show ? 'var(--ai-tool-result-max-height)' : '0')};
  min-height: ${p => (p.$show ? '200px' : '0')};
  overflow-y: auto;
  padding: 0;
  position: relative;
  transition: all 0.3s;
  width: 100%;

  &::before,
  &::after {
    background-image: linear-gradient(to bottom, #fff0, #fff);
    content: ' ';
    display: flex;
    height: 20px;
    left: 0;
    position: absolute;
    width: 100%;
  }

  &::after {
    bottom: 0;
  }

  &::before {
    background-image: linear-gradient(to top, #fff0 50%, #fff);
    top: 35px;
  }
`;

const ResultHeading = styled(Heading)`
  align-items: flex-end;
  gap: 5px;
  height: 34px;
  padding-left: 5px;
`;

const ResultTab = styled(ButtonBase)`
  background: ${p => (p.$selected ? '#fff' : '#fff4')};
  border: var(--ai-tool-border);
  border-color: #aaa;
  border-bottom-color: ${p => (p.$selected ? '#fff' : '#aaa')};
  margin-bottom: -1px;
  padding: 6px 1rem;
  text-decoration: underline;
  text-decoration-color: #bbb0;
  text-underline-offset: 5px;
  transition: all 0.2s;
  z-index: 9;

  &:focus {
    text-decoration-color: #bbb;
    text-underline-offset: 2px;
  }
`;

const ResultActions = styled.div`
  display: flex;
  justify-content: flex-end;
  max-height: ${p => (p.$show ? '150px' : '0')};
  opacity: ${p => (p.$show ? '1' : '0')};
  padding: 0;
  transition: all 0.3s;
  width: 100%;

  /* > button:not(:first-child) {
    border-left: 1px solid #3331;
  } */
`;

const ResultActionButton = styled(ButtonBase)`
  background-color: #fff0;
  gap: 5px;
  overflow: hidden;
  padding: 8px;
  transition: background-color 0.3s;

  svg {
    height: var(--result-action-icon-size, 18px);
    stroke: var(--result-action-icon-stroke, #333);
    width: var(--result-action-icon-size, 18px);

    * {
      /* stylelint-disable-next-line declaration-no-important */
      stroke: var(--result-action-icon-stroke, #333) !important;
    }
  }

  &:hover {
    background-color: #ebebeb;
  }
`;

const ResultContent = styled.div`
  border: none;
  border-top: 1px solid #aaa;
  color: #555;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  min-height: 200px;
  outline: none;
  overflow-y: scroll;
  padding: 32px 6%;
  white-space: pre-line;
  width: 100%;
  word-wrap: break-word;

  p {
    margin: 0;
  }

  h4 {
    margin: 0 0 10px 0;
  }
`;

// #endregion RESULT --------------------

// #region CUSTOM PROMPTS ---------------

const CustomPromptContainer = styled.div`
  border-top: ${p => (p.$show ? '1px solid #aaa' : '0 solid #3330')};
  display: flex;
  flex-direction: column;
  height: ${p => (p.$show ? 'fit-content' : 'unset')};
  padding: 0;
  width: 100%;
`;

const CustomPromptsHeading = styled(ButtonBase)`
  align-self: flex-end;
  background: #fffb;
  border: none;
  border-top: 1px solid #ddd;
  font-size: 12px;
  height: 35px;
  justify-content: space-between;
  min-height: 14px; /* to avoid clipping */
  padding: 5px 5px 5px 15px;
  width: 100%;
`;

const CustomPromptsList = styled.div`
  background: #f2f2f2;
  display: flex;
  flex-direction: column;
  max-height: ${p => (p.$show ? '205px' : '0')};
  overflow-y: scroll;
  padding: 0;
  transition: all 0.3s linear;

  > *:not(:first-child) {
    border-top: 1px solid #ddd;
  }
`;

const CustomPromptButton = styled(ButtonBase)`
  align-items: center;
  padding: 0;

  p {
    background-color: #fff;
    border-left: 4px solid ${p => (p.$selected ? '#ddd' : '#aaa')};
    color: #777;
    margin: 0;
    padding: 0.5rem 1rem;
    text-align: left;
    transition: all 0.3s;
    width: 100%;
  }

  &:focus {
    p {
      background-color: #fffa;
      border-color: #aaa;
    }
  }
`;
// #endregion CUSTOM PROMPTS ------------

// #endregion STYLED COMPONENTS ---------------------------------------------

const AskAIOverlay = ({ setPosition, position, config }) => {
  // #region HOOKS & INIT ------------------------
  const { t, i18n } = useTranslation();
  const ctx = useContext(WaxContext);
  const {
    app,
    pmViews: { main },
    options,
  } = ctx;

  const inputRef = useRef(null);
  const resultRef = useRef(null);
  const [userPrompt, setUserPrompt] = useState('');
  const [optionsState, setOptionsState] = useState({ ...options });
  const [fullScreen, setFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [result, setResult] = useState({
    [DEFAULT_KEY]: '',
  });
  const [resultKey, setResultKey] = useState(DEFAULT_KEY);

  const aiService = app.config.get('config.AskAiContentService');
  const { AskAiContentTransformation } = config;
  const { CustomPrompts, FreeTextPromptsOn } = aiService;

  useLayoutEffect(() => {
    const aiOverlay = document.getElementById(AI_TOOL_ID);
    if (!aiOverlay) return;
    const coords = {
      surface: main.dom.getBoundingClientRect(),
      end: main.coordsAtPos(main.state.selection.to - 1),
      overlay: aiOverlay.getBoundingClientRect(),
    };
    const waxSurfaceScroll = document.getElementById('wax-surface-scroll');
    const { left, top } = getUpdatedPosition(coords);

    setPosition({
      ...position,
      left: fullScreen ? 0 : left,
      top: fullScreen ? waxSurfaceScroll.scrollTop + 20 : top,
    });

    const { from, to } = main.state.selection;
    const selectedText = main.state.doc.textBetween(from, to, undefined, '\n');
    !result[DEFAULT_KEY] &&
      setResult(prev => ({ ...prev, [DEFAULT_KEY]: selectedText }));
    aiOverlay.parentNode.style.width = fullScreen ? '100%' : '80%';
    aiOverlay.parentNode.style.zIndex = '9999';
    aiOverlay.parentNode.style.height = fullScreen ? '94%' : 'unset';
    inputRef?.current && debouncedFocus();
  }, [position.left, options.AiOn, fullScreen]);

  // #endregion HOOKS & INIT --------------------

  // #region HELPERS -----------------------------

  const fillAndFocusInput = customPrompt => {
    if (userPrompt === customPrompt) return;
    setUserPrompt(customPrompt);
    inputRef.current.focus();
  };

  const safeTranslation = (translation, fallback) => {
    return !isEmpty(i18n) && i18n.exists(translation)
      ? t(translation)
      : fallback;
  };

  const saveResult = () => {
    resultRef?.current &&
      result[resultKey] &&
      setResult(prev => ({
        ...prev,
        [resultKey]: resultRef.current.innerHTML,
      }));
  };

  const setOption = (key, state) => {
    ctx.setOption({ [key]: state });
    setOptionsState(prev => ({
      ...prev,
      [key]: state,
    }));
  };

  const copyText = async () => {
    if (!resultRef?.current) return;
    copyTextContent(resultRef?.current.textContent);
  };

  const debouncedFocus = debounce(() => {
    inputRef.current && inputRef.current.focus();
  }, 200);

  // #endregion HELPERS --------------------------

  // #region HANDLERS ----------------------------

  const handleInputChange = e => {
    setUserPrompt(e.target.value);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = async (passedInput = userPrompt, force) => {
    if (!enabled.send && !force) {
      inputRef.current.focus();
      return;
    }
    setIsLoading(true);

    // Updated to the new input format from gpt4o, We can pass an array of base64 images under image_url prop
    const input = { text: [passedInput, resultRef?.current?.textContent] };

    try {
      const response = await AskAiContentTransformation(input, {
        askKb: optionsState.AskKb,
        prevResult: result,
      });

      const processedRes = safeParse(response, DEFAULT_KEY);
      saveResult();
      setResultKey(keys(processedRes)[0] ?? DEFAULT_KEY);

      setResult(processedRes);
    } catch (error) {
      setResult({ [DEFAULT_KEY]: error });
    } finally {
      setIsLoading(false);
      setUserPrompt('');
    }
  };

  const handleTabChange = tab => {
    !['links', 'citations'].includes(resultKey) && saveResult();
    setResultKey(tab);
  };

  const handleAddCustomPrompt = async prompt => {
    fillAndFocusInput(prompt);
    handleSubmit(prompt, true);
  };

  // #endregion HANDLERS -------------------------

  // #region UI ----------------------------------

  const submitIcon = isLoading ? <icons.loaderIco /> : <icons.send />;

  const resultKeys = Object.keys(result);

  // To ensure we pass the response string in the correct format to the editor
  const resultString =
    typeof result[resultKey] === 'string'
      ? result[resultKey]
      : result[resultKey]?.join('\n\n') ?? '';

  const enabled = {
    component: !!options?.AiOn,
    input: !!FreeTextPromptsOn,
    results: !!result[resultKey],
    customprompts: !!options?.CustomPromptsOn,
    send: userPrompt.length > 1,
    resultEdit: resultKey === DEFAULT_KEY,
  };

  const resultActions = {
    replace: {
      label: 'Replace',
      Icon: icons.replaceIco,
      title: safeTranslation(
        `Wax.AI.Replace selected text`,
        'Replace selected text',
      ),
      onClick: () => {
        replaceSelectedText(main, resultString, true);
        main.focus();
      },
      tabIndex: enabled.results ? 0 : -1,
    },
    insert: {
      label: 'Insert',
      Icon: icons.insertIco,
      title: safeTranslation(`Wax.AI.Insert`, 'Insert'),
      onClick: () => {
        replaceSelectedText(main, resultString);
        main.focus();
      },
      tabIndex: enabled.results ? 0 : -1,
    },
    copy: {
      Icon: icons.copy,
      title: 'Copy',
      onClick: () => copyText(),
      tabIndex: enabled.results ? 0 : -1,
      style: { '--result-action-icon-stroke': '#777' },
    },
    tryAgain: {
      Icon: icons.tryAgain,
      title: safeTranslation(`Wax.AI. Try again`, 'Try again'),
      onClick: () => {
        setResult({});
        handleSubmit();
      },
      tabIndex: enabled.results ? 0 : -1,
      style: { '--result-action-icon-size': '16px' },
    },
    discard: {
      Icon: icons.deleteIco,
      title: safeTranslation(`Wax.AI.Discard`, 'Discard'),
      onClick: () => {
        setUserPrompt('');
        setResult({});
      },
      tabIndex: enabled.results ? 0 : -1,
      style: { '--result-action-icon-size': '16px' },
    },
  };

  // #endregion UI -------------------------------

  return enabled.component ? (
    <Root $fullScreen={fullScreen} id={AI_TOOL_ID}>
      <MainHeading>
        <span>
          <icons.ai />
          AI Assistant
        </span>
        <ButtonBase onClick={() => setFullScreen(!fullScreen)}>
          {fullScreen ? <icons.fullScreenExit /> : <icons.fullScreen />}
        </ButtonBase>
      </MainHeading>
      <ResultContainer $show={enabled.results}>
        <ResultHeading>
          {resultKeys?.map(k => (
            <ResultTab
              $selected={resultKey === k}
              key={k}
              onClick={() => handleTabChange(k)}
            >
              {capitalize(k)}
            </ResultTab>
          ))}
          <ResultActions $show={enabled.results}>
            {Object.values(resultActions).map(
              ({ title, Icon, label, ...rest }) => (
                <ResultActionButton key={title} title={title} {...rest}>
                  <Icon /> {label || ''}
                </ResultActionButton>
              ),
            )}
          </ResultActions>
        </ResultHeading>
        <ResultContent
          contentEditable={enabled.resultEdit}
          dangerouslySetInnerHTML={{
            __html: resultsToHtml(resultKey, result[resultKey]),
          }}
          ref={resultRef}
        />
      </ResultContainer>
      <AskAIForm $show>
        <FlexRow>
          <PromptInput
            $disabled={!enabled.input}
            id="askAiInput"
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={safeTranslation(
              `Wax.AI.Placeholder`,
              'How can I help you? Type your prompt here.',
            )}
            ref={inputRef}
            type="text"
            value={userPrompt}
          />
          <SendButton
            disabled={!enabled.send}
            onClick={() => {
              handleSubmit();
            }}
          >
            {submitIcon}
          </SendButton>
          <PromptOptions
            aiService={aiService}
            options={OPTIONS.prompt}
            optionsState={optionsState}
            setOption={setOption}
          />
        </FlexRow>
      </AskAIForm>

      {CustomPrompts.length > 0 && (
        <CustomPromptContainer>
          <CustomPromptsHeading
            onClick={() =>
              setOption('CustomPromptsOn', !optionsState.CustomPromptsOn)
            }
          >
            <span>Custom Prompts</span>
            {!optionsState.CustomPromptsOn ? (
              <icons.arrowDown />
            ) : (
              <icons.arrowUp />
            )}
          </CustomPromptsHeading>
          <CustomPromptsList $show={enabled.customprompts}>
            {CustomPrompts?.map(prompt => (
              <CustomPromptButton
                $selected={userPrompt === prompt}
                key={prompt}
                onClick={() => handleAddCustomPrompt(prompt)}
              >
                <p>{`"${prompt}"`}</p>
              </CustomPromptButton>
            ))}
          </CustomPromptsList>
        </CustomPromptContainer>
      )}
    </Root>
  ) : null;
};

AskAIOverlay.propTypes = {
  position: PropTypes.shape({
    left: PropTypes.number,
  }),
  setPosition: PropTypes.func,
  config: PropTypes.shape({ AskAiContentTransformation: PropTypes.func }),
};

AskAIOverlay.defaultProps = {
  position: {},
  setPosition: () => {},
  config: {
    AskAiContentTransformation: () => {},
  },
};

export default AskAIOverlay;
