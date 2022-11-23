import React, { useContext, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { WaxContext } from 'wax-prosemirror-core';

const StyledInputAlt = styled.input`
  background: #e2ebff;
  border: none;
  box-sizing: border-box;
  width: 240px;
  min-height: 20px;
  padding: 4px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: black;
    font-weight: bold;
  }
`;

export default ({ setPosition, position }) => {
  const altRef = useRef(null);
  const [altText, setAltText] = useState('');
  const context = useContext(WaxContext);
  const {
    activeView,
    pmViews: { main },
  } = context;

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  const readOnly = !isEditable;

  useLayoutEffect(() => {
    const WaxSurface = main.dom.getBoundingClientRect();
    const { selection } = activeView.state;

    if (!selection || !selection.node || !selection.node.attrs.id) return;
    const imageId = selection.node.attrs.id;
    const image = document.querySelector(`[data-id='${imageId}']`);
    const figCaption = document.getElementsByTagName('figcaption')[0];
    if (!image) return;
    const imagePosition = image.getBoundingClientRect();
    const figCaptionPosition = figCaption.getBoundingClientRect().height - 5;
    const left = imagePosition.left - WaxSurface.left;
    const top = imagePosition.bottom - WaxSurface.top - figCaptionPosition;
    setPosition({ ...position, left, top });
  }, [position.left, position.top]);

  const altTextOnChange = () => {
    const { selection } = activeView.state;
    setAltText(altRef.current.value);
    activeView.dispatch(
      activeView.state.tr.setNodeMarkup(selection.from, undefined, {
        ...selection.node.attrs,
        alt: altRef.current.value,
      }),
    );
  };

  if (!readOnly) {
    return (
      <StyledInputAlt
        autoFocus="autoFocus"
        key="alt"
        onChange={altTextOnChange}
        placeholder="Alt Text"
        ref={altRef}
        type="text"
        value={
          activeView.state.selection &&
          activeView.state.selection.node &&
          activeView.state.selection.node.attrs.alt !== ''
            ? activeView.state.selection.node.attrs.alt
            : altText
        }
      />
    );
  }
};
