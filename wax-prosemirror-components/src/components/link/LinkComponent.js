/* eslint react/prop-types: 0 */
import React, { useRef, useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { WaxContext } from 'wax-prosemirror-core';
import { DocumentHelpers } from 'wax-prosemirror-utilities';

const Wrapper = styled.div`
  background: silver;
  display: inline-block;
  padding: 12px;
  a {
    color: unset;
    text-decoration: none;
  }
`;

const LinkWrapper = styled.div`
  display: inline-block;
  width: 250px;
  margin-right: 12px;
`;

const Input = styled.input`
  width: calc(100% - 8px);
  border: none;
  outline: none;
  :focus {
    outline: none;
  }
`;

const ButtonGroup = styled.div`
  display: inline-block;
`;

const StyledButton = styled.button`
  margin-right: 10px;
  background: #777;
  color: #fff;
`;

const LinkComponent = ({ mark, setPosition, position }) => {
  const href = mark ? mark.attrs.href : null;
  const linkMark = mark ? mark : null;
  const { activeView } = useContext(WaxContext);
  const { state, dispatch } = activeView;
  const ref = useRef(null);
  const linkInput = useRef(null);
  const [lastLinkMark, setLLastLinkMark] = useState(linkMark);
  const [linkHref, setLinkHref] = useState(href);
  const [editable, setEditable] = useState(!linkHref);

  useEffect(() => {
    setLinkText();
    removeMarkIfEmptyHref();
  }, [ref.current, href]);

  const addLinkHref = () => {
    const href = linkHref;
    if (linkInput.current.value === '') {
      linkInput.current.focus();
      return false;
    }
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
    setEditable(false);
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
      setLinkHref(mark.attrs.href);
    } else {
      setLinkHref('');
      if (linkInput.current) linkInput.current.focus();
    }
  };

  const removeMarkIfEmptyHref = () => {
    const {
      selection: { $from, $to },
    } = state;
    const PMLinkMark = state.schema.marks.link;
    const actualMark = DocumentHelpers.findMark(state, PMLinkMark);
    setLLastLinkMark(actualMark);

    if (
      lastLinkMark.attrs.href === '' &&
      ($from.pos < lastLinkMark.from || $to.pos > lastLinkMark.to)
    ) {
      dispatch(
        state.tr
          .setMeta('addToHistory', false)
          .removeMark(lastLinkMark.from, lastLinkMark.to, PMLinkMark),
      );
    }
  };

  const getValidUrl = (url = '') => {
    let newUrl = window.decodeURIComponent(url);
    newUrl = newUrl.trim().replace(/\s/g, '');

    if (/^(:\/\/)/.test(newUrl)) {
      return `http${newUrl}`;
    }
    if (!/^(f|ht)tps?:\/\//i.test(newUrl)) {
      return `http://${newUrl}`;
    }

    return newUrl;
  };

  const editLinkHref = () => {
    if (
      linkInput.current &&
      linkInput.current.value === '' &&
      lastLinkMark.attrs.href === ''
    ) {
      dispatch(
        state.tr
          .setMeta('addToHistory', false)
          .removeMark(mark.from, mark.to, state.schema.marks.link),
      );
      activeView.focus();
      return false;
    }
    setLinkHref(lastLinkMark.attrs.href);
    setEditable(!editable);
    return false;
  };

  const selectionContainsLink = () => {
    const {
      selection: { from, to },
    } = state;
    const markFound = DocumentHelpers.findMark(
      state,
      activeView.state.schema.marks.link,
      true,
    );

    if (markFound.length >= 1) {
      if (from < markFound[0].from || to > markFound[0].to) return true;
    }

    return false;
  };

  return !selectionContainsLink() && mark ? (
    <Wrapper>
      <LinkWrapper ref={ref}>
        {editable && (
          <Input
            ref={linkInput}
            onChange={updateLinkHref}
            onKeyPress={handleKeyDown}
            value={linkHref}
          />
        )}

        {!editable && (
          <a href={getValidUrl(linkHref)} rel="noreferrer" target="_blank">
            {getValidUrl(linkHref)}
          </a>
        )}
      </LinkWrapper>

      <ButtonGroup>
        {editable && (
          <>
            <StyledButton onClick={addLinkHref} type="button">
              Apply
            </StyledButton>

            <StyledButton onClick={editLinkHref} type="button">
              Cancel
            </StyledButton>
          </>
        )}

        {!editable && (
          <>
            <StyledButton onClick={editLinkHref} type="button">
              Edit
            </StyledButton>

            <StyledButton onClick={removeLink} type="button">
              Remove
            </StyledButton>
          </>
        )}
      </ButtonGroup>
    </Wrapper>
  ) : null;
};

export default LinkComponent;
