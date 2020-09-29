/* eslint react/prop-types: 0 */
import React, { useContext, useRef } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import styled from 'styled-components';

import MenuButton from '../ui/buttons/MenuButton';

const UploadImage = styled.div`
  /* opacity: ${props => (props.select ? 1 : 0.4)};
  pointer-events: ${props => (props.select ? 'default' : 'none')};
  display: inline-flex;
  padding: 0px 10px; */

  input {
    display: none;
  }
`;

// TO DO -- select should be done with MenuButton's disabled prop

const ImageUpload = ({ item, fileUpload, view }) => {
  const { activeViewId } = useContext(WaxContext);

  const inputRef = useRef(null);
  const handleMouseDown = () => inputRef.current.click();

  return (
    <UploadImage>
      <label htmlFor="file-upload">
        <MenuButton
          active={false}
          disabled={!(item.select && item.select(view.state, activeViewId))}
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
    </UploadImage>
  );
};
export default ImageUpload;
