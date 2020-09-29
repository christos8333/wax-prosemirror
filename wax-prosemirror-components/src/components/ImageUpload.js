/* eslint react/prop-types: 0 */
import React, { useContext, useRef } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import styled from 'styled-components';

import MenuButton from '../ui/buttons/MenuButton';

const Wrapper = styled.div`
  input {
    display: none;
  }
`;

const ImageUpload = ({ item, fileUpload, view }) => {
  const { activeViewId } = useContext(WaxContext);

  const inputRef = useRef(null);
  const handleMouseDown = () => inputRef.current.click();

  return (
    <Wrapper>
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
    </Wrapper>
  );
};
export default ImageUpload;
