/* eslint-disable react/prop-types */
import React, { useContext, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { WaxContext } from 'wax-prosemirror-core';

const StyledInputLongDesc = styled.textarea`
  background: #e2ebff;
  border: none;
  box-sizing: border-box;
  display: block;
  min-height: 20px;
  min-width: ${({ imageWidth }) => imageWidth ?? 240}px;
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
  const longDescRef = useRef(null);
  const [longDescText, setLongDescText] = useState('');
  const context = useContext(WaxContext);
  const {
    app,
    activeView,
    pmViews: { main },
  } = context;

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  const readOnly = !isEditable;

  const { selection } = activeView.state;
  const imageId = selection?.node?.attrs.id;
  let image = document.querySelector(`[data-id='${imageId}']`);

  useLayoutEffect(() => {
    const WaxSurface = main.dom.getBoundingClientRect();

    if (!selection || !selection.node || selection.node.type.name !== 'image')
      return;

    if (!image)
      image = document.querySelector(
        `[data-fileid='${selection.node.attrs.fileid}']`,
      );

    const figCaption = document.getElementsByTagName('figcaption')[0];

    if (!image || !figCaption) return;
    const imagePosition = image.getBoundingClientRect();
    const figCaptionPosition = figCaption.getBoundingClientRect().bottom + 5;
    const left = imagePosition.left - WaxSurface.left;
    const top = figCaptionPosition - WaxSurface.top;
    setPosition({ ...position, left, top });
  }, [position.left, position.top]);

  const longDescriptionOnChange = () => {
    setLongDescText(longDescRef.current.value);
    activeView.dispatch(
      activeView.state.tr.setNodeMarkup(selection.from, undefined, {
        ...selection.node.attrs,
        'aria-description': longDescRef.current.value,
      }),
      // .setMeta('imageLongDesc', true),
    );
  };

  const imageConfig = app.config.get('config.ImageService');
  const showLongDesc = imageConfig && imageConfig.showLongDesc;

  return !readOnly && showLongDesc ? (
    <StyledInputLongDesc
      imageWidth={image?.clientWidth}
      key="longDesc"
      onChange={longDescriptionOnChange}
      placeholder="Long description (optional)"
      ref={longDescRef}
      rows={3}
      value={
        activeView.state.selection &&
        activeView.state.selection.node &&
        activeView.state.selection.node.attrs['aria-description'] !== ''
          ? activeView.state.selection.node.attrs['aria-description']
          : longDescText
      }
    />
  ) : null;
};
