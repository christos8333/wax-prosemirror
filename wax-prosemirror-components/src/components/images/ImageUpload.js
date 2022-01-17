/* eslint react/prop-types: 0 */
import React, { useContext, useRef, useMemo } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import { TextSelection } from 'prosemirror-state';
import styled from 'styled-components';
import { DocumentHelpers } from 'wax-prosemirror-utilities';
import MenuButton from '../../ui/buttons/MenuButton';
import insertImage from './Upload';

const Wrapper = styled.div`
  input {
    display: none;
  }
`;

const ImageUpload = ({ item, fileUpload, view }) => {
  const context = useContext(WaxContext);
  const {
    app,
    activeView,
    activeViewId,
    view: { main },
  } = context;

  const inputRef = useRef(null);
  const placeholderPlugin = app.PmPlugins.get('imagePlaceHolder');
  const imageServiceConfig = app.config.get('config.ImageService');

  const handleMouseDown = () => {
    if (activeViewId !== 'main') {
      const allNodes = DocumentHelpers.findBlockNodes(view.state.doc);
      let nodeFound = '';
      allNodes.forEach(node => {
        if (node.node.attrs.id === activeViewId) {
          nodeFound = node;
        }
      });
      context.view.main.dispatch(
        context.view.main.state.tr
          .setMeta('outsideView', activeViewId)
          .setSelection(
            new TextSelection(
              context.view.main.state.tr.doc.resolve(
                nodeFound.pos +
                  2 +
                  context.view[activeViewId].state.selection.to,
              ),
            ),
          ),
      );
    }
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
            onMouseDown={e => {
              e.preventDefault();
              handleMouseDown();
            }}
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
    [isDisabled, activeViewId],
  );

  return ImageUploadComponent;
};
export default ImageUpload;
