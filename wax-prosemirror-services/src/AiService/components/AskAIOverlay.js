/* eslint-disable react/prop-types */
import React, { useRef, useLayoutEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { WaxContext, icons } from 'wax-prosemirror-core';
import replaceSelectedText from '../ReplaceSelectedText';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const AskAIForm = styled.div`
  background: #fafafa;
  border: 0.5px #dcdcdc solid;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
  display: inline-flex;
  justify-content: space-between;
  padding: 8px 12px;
  width: 458px;
`;

const ActionButton = styled.button`
  align-items: center;
  align-self: stretch;
  background: white;
  border: 0.5px #f0f0f0 solid;
  cursor: pointer;
  display: inline-flex;
  gap: 8px;
  justify-content: flex-start;
  padding: 8px 12px;
`;

const ActionSection = styled.div`
  align-items: flex-start;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 250px;
`;

const ActionText = styled.div`
  color: ${props => props.color || '#434343'};
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  word-wrap: break-word;
`;

const AskAIFormInput = styled.input`
  background: transparent;
  border: none;
  color: #000;
  font-family: 'Helvetica Neue', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  outline: none;
  width: 100%;
`;

const ResultDiv = styled.div`
  align-items: center;
  background: white;
  border: 0.5px #dcdcdc solid;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
  display: inline-flex;
  flex-direction: column;
  gap: 10px;
  justify-content: flex-start;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px 12px;
  width: 458px;
`;

const ResultText = styled.div`
  color: black;
  flex: 1 1 0;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  white-space: pre-line;
  word-wrap: break-word;
`;

const SubmitButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0 8px; /* Adjust padding as needed */
`;

const AskAIOverlay = ({ setPosition, position, config }) => {
  const { t, i18n } = useTranslation();
  const {
    pmViews: { main },
    options,
  } = useContext(WaxContext);
  const [result, setResult] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { AskAiContentTransformation } = config;
  const inputRef = useRef(null);

  useLayoutEffect(() => {
    const WaxSurface = main.dom.getBoundingClientRect();
    const { selection } = main.state;
    const { to } = selection;
    // const start = main.coordsAtPos(from);
    const end = main.coordsAtPos(to - 1);
    const overLayComponent = document.getElementById('ai-overlay');
    if (!overLayComponent) return;
    const overLayComponentCoords = overLayComponent.getBoundingClientRect();
    const top = end.top - WaxSurface.top + 20;
    let left = end.left - WaxSurface.left - overLayComponentCoords.width / 2;

    if (end.left - overLayComponentCoords.width / 2 < WaxSurface.left) {
      left += WaxSurface.left - (end.left - overLayComponentCoords.width / 2);
    }

    // Don't get out of right boundary of the surface
    if (end.left + overLayComponentCoords.width / 2 > WaxSurface.right) {
      left -= end.left + overLayComponentCoords.width / 2 - WaxSurface.right;
    }

    setPosition({ ...position, left, top });
  }, [position.left, options.AiOn]);

  const tryAgain = () => {
    // Reset the state to initial values
    setIsSubmitted(false);
    setResult('');

    // Call the handleSubmit function again
    handleSubmit(new Event('submit'));
    // add underline
  };

  const handleInsertTextBelow = () => {
    replaceSelectedText(main, result);
  };

  const handleSubmit = async () => {
    const inputValue = inputRef.current.value;
    if (inputValue === '') {
      inputRef.current.focus();
      return;
    }
    setIsSubmitted(false);
    setIsLoading(true);

    // Get the highlighted text from the editor
    const { from, to } = main.state.selection;
    const highlightedText = main.state.doc.textBetween(from, to);

    // Combine the user's input and the highlighted text
    const combinedInput = `${inputValue}\n\n${highlightedText}`;

    try {
      const response = await AskAiContentTransformation(combinedInput);
      setResult(response);
      setIsSubmitted(true);
    } catch (error) {
      setResult(error);
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReplaceText = () => {
    replaceSelectedText(main, result, true);
  };

  const discardResults = () => {
    // Clear the input field
    inputRef.current.value = '';

    // Reset the state variables
    setResult('');
    setIsSubmitted(false);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return options?.AiOn ? (
    <Wrapper id="ai-overlay">
      <AskAIForm>
        <AskAIFormInput
          id="askAiInput"
          onKeyPress={handleKeyDown}
          placeholder={
            !isEmpty(i18n) && i18n.exists(`Wax.AI.Placeholder`)
              ? t(`Wax.AI.Placeholder`)
              : 'How can I help you? Type your prompt here.'
          }
          ref={inputRef}
          type="text"
        />
        <SubmitButton onClick={handleSubmit}>
          {isLoading ? <icons.loaderIco /> : <icons.submitIco />}
        </SubmitButton>
      </AskAIForm>
      {isSubmitted && (
        <>
          <ResultDiv>
            <ResultText dangerouslySetInnerHTML={{ __html: result }} />
          </ResultDiv>
          <ActionSection>
            <ActionButton onClick={handleReplaceText}>
              <ActionText>
                <icons.replaceIco />{' '}
                {!isEmpty(i18n) && i18n.exists(`Wax.AI.Replace selected text`)
                  ? t(`Wax.AI.Replace selected text`)
                  : 'Replace selected text'}
              </ActionText>
            </ActionButton>
            <ActionButton onClick={handleInsertTextBelow}>
              <ActionText>
                <icons.insertIco />{' '}
                {!isEmpty(i18n) && i18n.exists(`Wax.AI.Insert`)
                  ? t(`Wax.AI.Insert`)
                  : 'Insert'}
              </ActionText>
            </ActionButton>
            <ActionButton onClick={tryAgain}>
              <ActionText>
                <icons.tryAgain />{' '}
                {!isEmpty(i18n) && i18n.exists(`Wax.AI.Try again`)
                  ? t(`Wax.AI. Try again`)
                  : 'Try again'}
              </ActionText>
            </ActionButton>
            <ActionButton onClick={discardResults}>
              <ActionText color="#FF4E4E">
                <icons.deleteIco />{' '}
                {!isEmpty(i18n) && i18n.exists(`Wax.AI.Discard`)
                  ? t(`Wax.AI.Discard`)
                  : 'Discard'}
              </ActionText>
            </ActionButton>
          </ActionSection>
        </>
      )}
    </Wrapper>
  ) : null;
};

export default AskAIOverlay;
