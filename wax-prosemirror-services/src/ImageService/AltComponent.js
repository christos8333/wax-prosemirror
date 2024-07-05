/* eslint-disable react/prop-types */
import React, { useContext, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { WaxContext, ApplicationContext } from 'wax-prosemirror-core';

const StyledInputAlt = styled.input`
  background: #e2ebff;
  border: none;
  box-sizing: border-box;
  min-height: 20px;
  padding: 4px;
  width: 240px;

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
  const { app } = useContext(ApplicationContext);
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

    if (!selection || !selection.node || selection.node.type.name !== 'image')
      return;
    const imageId = selection.node.attrs.id;
    let image = document.querySelector(`[data-id='${imageId}']`);
    if (!image)
      image = document.querySelector(
        `[data-fileid='${selection.node.attrs.fileid}']`,
      );

    if (!image) return;

    const siblings = [...image.parentElement.children];
    const figCaption = siblings.find(s => s.tagName === 'FIGCAPTION');
    let figCaptionPosition = 25;

    if (figCaption) {
      figCaptionPosition = figCaption.getBoundingClientRect().height - 5;
    }

    const imagePosition = image.getBoundingClientRect();
    const left = imagePosition.left - WaxSurface.left;
    const top = imagePosition.bottom - WaxSurface.top - figCaptionPosition;

    setPosition({ ...position, left, top });
  }, [position.left, position.top]);

  const altTextOnChange = () => {
    const { selection } = activeView.state;
    setAltText(altRef.current.value);
    activeView.dispatch(
      activeView.state.tr
        .setNodeMarkup(selection.from, undefined, {
          ...selection.node.attrs,
          alt: altRef.current.value,
        })
        .setMeta('imageAlt', true),
    );
  };

  const imageConfig = app.config.get('config.ImageService');
  const showAlt = imageConfig && imageConfig.showAlt;
  // const autoFocus =
  //   activeView.state.selection &&
  //   activeView.state.selection.node &&
  //   activeView.state.selection.node.attrs.alt === '';

  return !readOnly && showAlt ? (
    <StyledInputAlt
      // autoFocus={autoFocus}
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
  ) : null;
};
