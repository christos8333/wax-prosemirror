/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { WaxContext } from 'wax-prosemirror-core';
import { isEmpty } from 'lodash';
import replaceText from '../replaceText';
import ExternalApiButton from './ExternalApiButton';

const ExternalApiComponent = ({ view, displayed, config, pmplugins, item }) => {
  const context = useContext(WaxContext);
  if (isEmpty(view)) return null;

  const ExternalAPIContent = replaceText(
    view,
    config.get('config.ExternalAPIContentService')
      .ExternalAPIContentTransformation,
    pmplugins.get('ExternalAPIContentPlaceHolder'),
    context,
  );

  return displayed ? (
    <ExternalApiButton
      ExternalAPIContent={ExternalAPIContent}
      item={item.toJSON()}
      key={uuidv4()}
      view={view}
    />
  ) : null;
};

export default ExternalApiComponent;
