import React from "react";
import styled from "styled-components";

const UploadImage = styled.div`
  color: #777;
  display: inline-flex;
  .custom-file-upload {
    cursor: pointer;
  }
  &:hover {
  }
  input {
    display: none;
  }
`;
const ImageUpload = ({ item, fileUpload }) => (
  <UploadImage>
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
export default ImageUpload;
