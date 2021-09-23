/* eslint react/prop-types: 0 */
import React, { useContext, useRef, useMemo } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import styled from 'styled-components';

import MenuButton from '../../ui/buttons/MenuButton';
import insertImage from './Upload';

const Wrapper = styled.div`
  input {
    display: none;
  }
`;

const ImageUpload = ({ item, fileUpload, view }) => {
  const {
    app,
    activeView,
    view: { main },
  } = useContext(WaxContext);

  const inputRef = useRef(null);
  const placeholderPlugin = app.PmPlugins.get('imagePlaceHolder');
  const imageServiceConfig = app.config.get('config.ImageService');

  const handleMouseDown = () => {
    if (imageServiceConfig && imageServiceConfig.handleAssetManager) {
      insertThroughFileMAnager();
    } else {
      inputRef.current.click();
    }
  };

  async function insertThroughFileMAnager() {
    const handler = imageServiceConfig.handleAssetManager;
    const urls = await handler();
    insertImage(urls, view, placeholderPlugin);
  }

  let isDisabled = !item.select(activeView);

  const isEditable = main.props.editable(editable => {
    return editable;
  });
  if (!isEditable) isDisabled = true;

  const ImageUploadComponent = useMemo(
    () => (
      <Wrapper>
        <label htmlFor="file-upload">
          <MenuButton
            active={false}
            disabled={isDisabled}
            iconName={item.icon}
            onMouseDown={handleMouseDown}
            title="Upload Image"
          />

          <input
            id="file-upload"
            onChange={e => fileUpload(e.target.files[0])}
            ref={inputRef}
            type="file"
          />
        </label>
      </Wrapper>
    ),
    [isDisabled],
  );

  return ImageUploadComponent;
};
export default ImageUpload;
