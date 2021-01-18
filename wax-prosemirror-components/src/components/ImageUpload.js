/* eslint react/prop-types: 0 */
import React, { useContext, useRef, useMemo } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import styled from 'styled-components';

import MenuButton from '../ui/buttons/MenuButton';

const Wrapper = styled.div`
  input {
    display: none;
  }
`;

const ImageUpload = ({ item, fileUpload, view }) => {
  const {
    activeViewId,
    view: { main },
  } = useContext(WaxContext);

  const inputRef = useRef(null);
  const handleMouseDown = () => inputRef.current.click();

  let isDisabled = !item.select(view.state, activeViewId);

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
            ref={inputRef}
            onChange={e => fileUpload(e.target.files[0])}
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
