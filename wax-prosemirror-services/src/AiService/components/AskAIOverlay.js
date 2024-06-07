/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useLayoutEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { capitalize, isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { WaxContext, icons } from 'wax-prosemirror-core';
import { PropTypes } from 'prop-types';
import replaceSelectedText from '../ReplaceSelectedText';
import AiSettingsMenu from './AiSettingsMenu';
import { safeParse, resultsToHtml, getUpdatedPosition } from '../helpers';

const AI_TOOL_ID = 'ai-overlay';
const DEFAULT_KEY = 'content';

// #region STYLED COMPONENTS ------------------------------------------------

// #region MAIN & MISC-------------------

const Root = styled.div`
  --ai-tool-border-width: 1px;
  --ai-tool-border: var(--ai-tool-border-width) solid #0001;
  align-items: flex-end;
  background: #fff;
  border: var(--ai-tool-border);
  display: flex;
  filter: drop-shadow(0 0 1px #0002);
  flex-direction: column;

  div {
    ::-webkit-scrollbar {
      height: 5px;
      width: 5px;
    }

    ::-webkit-scrollbar-thumb {
      background: var(--scrollbar-color, #0004);
      border-radius: 5px;
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
  height: 23px;
  margin: 0;
  max-height: 23px;
  min-height: 23px;
  padding-left: 3px;
  width: 100%;
`;
const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
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

// #endregion MAIN & MISC----------------

// #region FORM -------------------------

const AskAIForm = styled.form`
  background: #fafafa;
  border-radius: 0.3rem 0.3rem 0 0;
  display: ${p => (p.$show ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: space-between;
  padding: 8px 12px;
  position: relative;
  width: 458px;
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
  border-right: 1px solid #0001;
  margin-bottom: 3px;
  padding: 0 8px;
`;

const SettingsButton = styled(ButtonBase)`
  padding: 0 0 0 8px;

  > svg {
    fill: #777;
    height: 16px;
    width: 16px;
  }
`;

// #endregion FORM --------------------------

// #region RESULT -----------------------

const ResultContainer = styled.div`
  align-items: center;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 0;
  height: 150px;
  justify-content: flex-start;
  max-height: ${p => (p.$show ? '150px' : '0')};
  overflow-y: auto;
  padding: 0;
  position: relative;
  transition: all 0.3s;
  width: 458px;
`;

const ResultHeading = styled(Heading)`
  align-items: flex-end;
`;

const ResultTab = styled(ButtonBase)`
  background: ${p => (p.$selected ? '#fff' : '#fff4')};
  border: var(--ai-tool-border);
  border-bottom-color: ${p => (p.$selected ? '#fff' : '#0001')};
  border-radius: 5px 5px 0 0;
  color: #777;
  font-size: 11px;
  font-style: italic;
  margin-bottom: -1px;
  padding: 3px 0.5rem;
  text-decoration: underline;
  text-decoration-color: #bbb0;
  text-underline-offset: 5px;
  transform: scale(${p => (p.$selected ? '1' : '0.93')});
  transform-origin: bottom;
  transition: all 0.2s;
  z-index: 9;

  &:focus {
    text-decoration-color: #bbb;
    text-underline-offset: 2px;
  }
`;

const ResultActions = styled.div`
  --separation: 7px;
  align-self: flex-end;
  background-color: #f8f8f8;
  border: var(--ai-tool-border);
  bottom: var(--separation);
  display: flex;
  max-height: ${p => (p.$show ? '150px' : '0')};
  opacity: ${p => (p.$show ? '1' : '0')};
  overflow: hidden;
  padding: 0;
  position: absolute;
  right: var(--separation);
  transition: all 0.3s;
  width: fit-content;

  > button:not(:first-child) {
    border-left: 1px solid #0001;
  }
`;

const ResultActionButton = styled(ButtonBase)`
  background-color: #fff0;
  outline: none;
  overflow: hidden;
  padding: 3.2px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f2f2f2;
  }
`;

const ResultContent = styled.div`
  border-top: var(--ai-tool-border);
  color: #555;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  overflow-y: scroll;
  padding: 14px 20px 32px;
  white-space: pre-line;
  width: 100%;
  word-wrap: break-word;

  * {
    margin: 0;
  }

  h4 {
    margin: 0 0 10px 0;
  }
`;

// #endregion RESULT --------------------

// #region CUSTOM PROMPTS ---------------

const CustomPromptContainer = styled.div`
  border-top: ${p => (p.$show ? 'var(--ai-tool-border)' : '0 solid #0000')};
  display: flex;
  flex-direction: column;
  font-style: italic;
  max-height: ${p => (p.$show ? '205px' : '0')};
  overflow: hidden;
  padding: 0;
  transition: all 0.3s linear;
  width: 458px;
`;

const CustomPromptsHeading = styled(Heading)`
  --gradient-direction: to top;
  color: #777;
  font-size: 11px;
  font-style: italic;
  line-height: 1;
  padding: 0.4rem;
`;

const CustomPromptsList = styled.div`
  background: #f2f2f2;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding: 0;
  transition: all 0.3s linear;

  > *:not(:first-child) {
    border-top: var(--ai-tool-border);
  }
`;

const CustomPromptButton = styled(ButtonBase)`
  align-items: center;
  padding: 0;

  p {
    background-color: ${p => (p.$selected ? '#fffa' : '#fff6')};
    border: var(--ai-tool-border);
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

const NoCustomPrompts = styled(FlexRow)`
  color: #555;
  justify-content: center;
  text-align: center;
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
  const [userPrompt, setUserPrompt] = useState('');
  const [optionsState, setOptionsState] = useState({ ...options });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [result, setResult] = useState({ [DEFAULT_KEY]: '' });
  const [resultKey, setResultKey] = useState(DEFAULT_KEY);
  const [showSettings, setShowSettings] = useState(false);

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

    const { left, top } = getUpdatedPosition(coords);

    setPosition({ ...position, left, top });
  }, [position.left, options.AiOn]);

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

  const handleShowSettings = e => {
    e.stopPropagation(); // to prevent !showSettings
    setShowSettings(!showSettings);
  };

  const handleSubmit = async () => {
    if (!enabled.send) {
      inputRef.current.focus();
      return;
    }
    setIsSubmitted(false);
    setIsLoading(true);

    const { from, to } = main.state.selection;
    const highlightedText = main.state.doc.textBetween(from, to);

    // Updated to the new input format from gpt4o, We can pass an array of base64 images under image_url prop
    const input = { text: [userPrompt, highlightedText] };

    try {
      const response = await AskAiContentTransformation(input, {
        askKb: optionsState.AskKb,
      });
      const processedRes = safeParse(response, DEFAULT_KEY);
      setResult(processedRes);
    } catch (error) {
      setResult({ [DEFAULT_KEY]: error });
    } finally {
      setResultKey(DEFAULT_KEY);
      setIsSubmitted(true);
      setIsLoading(false);
    }
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
    results: isSubmitted && !!result[resultKey],
    customprompts: !!options?.CustomPromptsOn,
    send: userPrompt.length > 1,
  };

  const resultActions = {
    replace: {
      Icon: icons.replaceIco,
      title: safeTranslation(
        `Wax.AI.Replace selected text`,
        'Replace selected text',
      ),
      onClick: () => {
        replaceSelectedText(main, resultString, true);
      },
      tabIndex: result.enabled ? 0 : -1,
    },
    insert: {
      Icon: icons.insertIco,
      title: safeTranslation(`Wax.AI.Insert`, 'Insert'),
      onClick: () => {
        replaceSelectedText(main, resultString);
      },
      tabIndex: result.enabled ? 0 : -1,
    },
    tryAgain: {
      Icon: icons.tryAgain,
      title: safeTranslation(`Wax.AI. Try again`, 'Try again'),
      onClick: () => {
        setIsSubmitted(false);
        setResult({});
        handleSubmit();
      },
      tabIndex: result.enabled ? 0 : -1,
    },
    discard: {
      Icon: icons.deleteIco,
      title: safeTranslation(`Wax.AI.Discard`, 'Discard'),
      onClick: () => {
        setUserPrompt('');
        setResult({});
        setIsSubmitted(false);
      },
      tabIndex: result.enabled ? 0 : -1,
    },
  };

  // #endregion UI -------------------------------

  return enabled.component ? (
    <Root id={AI_TOOL_ID} onClick={() => setShowSettings(false)}>
      <AskAIForm $show>
        <FlexRow>
          <PromptInput
            disabled={!enabled.input}
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
          <SendButton disabled={!enabled.send} onClick={handleSubmit}>
            {submitIcon}
          </SendButton>
          <SettingsButton onClick={handleShowSettings}>
            <icons.settings />
          </SettingsButton>
        </FlexRow>
        <AiSettingsMenu
          aiService={aiService}
          optionsState={optionsState}
          setOptionsState={setOptionsState}
          show={showSettings}
        />
      </AskAIForm>

      <ResultContainer $show={enabled.results}>
        <ResultHeading>
          {resultKeys?.map(k => (
            <ResultTab
              $selected={resultKey === k}
              key={k}
              onClick={() => setResultKey(k)}
            >
              {capitalize(k)}
            </ResultTab>
          ))}
        </ResultHeading>
        <ResultContent
          dangerouslySetInnerHTML={{
            __html: `<h4>${capitalize(resultKey)}</h4>${resultsToHtml(
              resultKey,
              result[resultKey],
            )}</br>`,
          }}
        />
        <ResultActions $show={enabled.results}>
          {Object.values(resultActions).map(({ title, Icon, ...rest }) => (
            <ResultActionButton key={title} {...rest}>
              <Icon />
            </ResultActionButton>
          ))}
        </ResultActions>
      </ResultContainer>

      <CustomPromptContainer $show={enabled.customprompts}>
        <CustomPromptsHeading>Custom Prompts</CustomPromptsHeading>
        <CustomPromptsList>
          {CustomPrompts.length > 0 ? (
            CustomPrompts?.map(prompt => (
              <CustomPromptButton
                $selected={userPrompt === prompt}
                key={prompt}
                onClick={() => fillAndFocusInput(prompt)}
              >
                <p>{`"${prompt}"`}</p>
              </CustomPromptButton>
            ))
          ) : (
            <NoCustomPrompts>
              <p>
                --
                {safeTranslation(
                  `Wax.AI.No custom prompts`,
                  `You don't have any custom prompts`,
                )}{' '}
                --
              </p>
            </NoCustomPrompts>
          )}
        </CustomPromptsList>
      </CustomPromptContainer>
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
