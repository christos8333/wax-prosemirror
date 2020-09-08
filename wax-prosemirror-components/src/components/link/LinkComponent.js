/* eslint react/prop-types: 0 */
import React, { useRef, useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { WaxContext } from 'wax-prosemirror-core';
import { DocumentHelpers } from 'wax-prosemirror-utilities';

const LinkWrapper = styled.div`
  padding: 20px;
  border-radius: 3px;
  border: 1px solid #000;
  background: #ecedf1;
  z-index: 9999;
  -webkit-box-shadow: 0px 0px 0px 2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 0px 2px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 0px 2px rgba(0, 0, 0, 0.75);
`;

const Button = styled.button`
  cursor: pointer;
`;

const LinkComponent = ({ mark, setPosition, position }) => {
  const href = mark ? mark.attrs.href : null;
  const linkMark = mark ? mark : null;
  const { activeView } = useContext(WaxContext);
  const { state, dispatch } = activeView;
  const ref = useRef(null);
  const linkInput = useRef(null);
  const [addButtonText, setButtonText] = useState('Create');
  const [lastLinkMark, setLLastLinkMark] = useState(linkMark);
  const [linkHref, setLinkHref] = useState(href);

  useEffect(() => {
    setLinkText();
    removeMarkIfEmptyHref();
  }, [ref.current, href]);

  const addLinkHref = () => {
    const href = linkHref;
    const linkMark = state.schema.marks.link;
    const { tr } = state;

    dispatch(
      tr.addMark(
        mark.from,
        mark.to,
        linkMark.create({
          ...((mark && mark.attrs) || {}),
          href,
        }),
      ),
    );
    activeView.focus();
  };

  const removeLink = () => {
    const { tr } = state;
    dispatch(tr.removeMark(mark.from, mark.to, state.schema.marks.link));
    activeView.focus();
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter' || event.which === 13) {
      addLinkHref();
    }
  };

  const updateLinkHref = () => {
    const {
      current: { value },
    } = linkInput;
    setLinkHref(value);
  };

  const setLinkText = () => {
    if (mark && mark.attrs.href !== '') {
      setButtonText('Update');
      setLinkHref(mark.attrs.href);
    } else {
      setButtonText('Create');
      setLinkHref('');
      if (linkInput.current) linkInput.current.focus();
    }
  };

  const removeMarkIfEmptyHref = () => {
    const {
      selection: { $from, $to },
    } = state;
    const PMLinkMark = state.schema.marks['link'];
    const actualMark = DocumentHelpers.findMark(state, PMLinkMark);
    setLLastLinkMark(actualMark);

    if (
      lastLinkMark.attrs.href === '' &&
      ($from.pos < lastLinkMark.from || $to.pos > lastLinkMark.to)
    ) {
      dispatch(
        state.tr
          .setMeta('addToHistory', false)
          .removeMark(
            lastLinkMark.from,
            lastLinkMark.to,
            state.schema.marks.link,
          ),
      );
    }
  };

  return mark ? (
    <LinkWrapper ref={ref}>
      <input
        type="text"
        ref={linkInput}
        onChange={updateLinkHref}
        onKeyPress={handleKeyDown}
        value={linkHref}
      />
      <Button primary onClick={addLinkHref}>
        {addButtonText}
      </Button>
      <Button onClick={removeLink}>Remove</Button>
    </LinkWrapper>
  ) : null;
};

export default LinkComponent;
