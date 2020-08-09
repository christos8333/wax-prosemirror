/* eslint react/prop-types: 0 */
import React, { useContext } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import styled from 'styled-components';

const UploadImage = styled.div`
  opacity: ${props => (props.select ? 1 : 0.4)};
  pointer-events: ${props => (props.select ? 'default' : 'none')};
  color: #777;
  display: inline-flex;
  padding: 0px 10px;
  .custom-file-upload {
    cursor: pointer;
  }
  &:hover {
  }
  input {
    display: none;
  }
`;
const ImageUpload = ({ item, fileUpload, view }) => {
  const { activeViewId } = useContext(WaxContext);
  return (
    <UploadImage select={item.select && item.select(view.state, activeViewId)}>
      <label
        className="custom-file-upload"
        title="upload image"
        htmlFor="file-upload"
      >
        {item.content}
        <input
          id="file-upload"
          onChange={e => fileUpload(e.target.files[0])}
          type="file"
        />
      </label>
    </UploadImage>
  );
};
export default ImageUpload;
