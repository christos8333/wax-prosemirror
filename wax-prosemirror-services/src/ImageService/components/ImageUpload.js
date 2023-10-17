/* eslint react/prop-types: 0 */
import React, { useContext, useRef, useMemo } from 'react';
import { TextSelection } from 'prosemirror-state';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { WaxContext, DocumentHelpers, MenuButton } from 'wax-prosemirror-core';
import styled from 'styled-components';
import insertImage from './Upload';

const Wrapper = styled.div`
  input {
    display: none;
  }
`;

const ImageUpload = ({ item, fileUpload, view }) => {
  const { t, i18n } = useTranslation();
  const { title } = item;
  const context = useContext(WaxContext);
  const {
    app,
    activeView,
    activeViewId,
    pmViews: { main },
  } = context;

  const isEditable = main.props.editable(editable => {
    return editable;
  });

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
      main.dispatch(
        main.state.tr
          .setMeta('outsideView', activeViewId)
          .setSelection(
            new TextSelection(
              main.state.tr.doc.resolve(
                nodeFound.pos +
                  1 +
                  context.pmViews[activeViewId].state.selection.to,
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

  const isDisabled =
    context.options.uploading || !item.select(activeView) || !isEditable;

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
            title={
              !isEmpty(i18n) && i18n.exists(`Wax.Images.${title}`)
                ? t(`Wax.Images.${title}`)
                : title
            }
          />

          <input
            accept="image/*"
            id="file-upload"
            onChange={e => {
              fileUpload(e.target.files[0]);
              context.setOption({ uploading: true });
              if (inputRef.current) inputRef.current.value = '';
            }}
            ref={inputRef}
            type="file"
          />
        </label>
      </Wrapper>
    ),
    [isDisabled, activeViewId, t(`Wax.Images.${title}`)],
  );

  return ImageUploadComponent;
};
export default ImageUpload;
