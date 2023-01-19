/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { WaxContext } from 'wax-prosemirror-core';
import { isEmpty } from 'lodash';
import fileUpload from '../fileUpload';
import ImageUpload from './ImageUpload';

const ImageUploadComponent = ({ view, displayed, config, pmplugins, item }) => {
  const context = useContext(WaxContext);
  if (isEmpty(view)) return null;

  const upload = fileUpload(
    view,
    config.get('fileUpload'),
    pmplugins.get('imagePlaceHolder'),
    context,
  );
  return displayed ? (
    <ImageUpload
      fileUpload={upload}
      item={item.toJSON()}
      key={uuidv4()}
      view={view}
    />
  ) : null;
};

export default ImageUploadComponent;
