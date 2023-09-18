/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { WaxContext } from 'wax-prosemirror-core';
import { isEmpty } from 'lodash';
import replaceText from '../replaceText';
import AskAiButton from './AskAiButton';

const AskAiComponent = ({ view, displayed, config, pmplugins, item }) => {
  const context = useContext(WaxContext);
  if (isEmpty(view)) return null;

  const AskAiContent = replaceText(
    view,
    config.get('config.AskAiContentService')
      .AskAiContentTransformation,
    pmplugins.get('AskAiContentPlaceHolder'),
    context,
  );

  return displayed ? (
    <AskAiButton
      AskAiContent={AskAiContent}
      item={item.toJSON()}
      key={uuidv4()}
      view={view}
    />
  ) : null;
};

export default AskAiComponent;
