import React, { useRef, useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { WaxContext } from "wax-prosemirror-core/src/ioc-react";
import { DocumentHelpers } from "wax-prosemirror-utilities";

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
  const href = mark ? mark.attrs.href : null,
    linkMark = mark ? mark : null,
    { view: { main } } = useContext(WaxContext),
    { state, dispatch } = main,
    ref = useRef(null),
    linkInput = useRef(null),
    [addButtonText, setButtonText] = useState("Create"),
    [lastLinkMark, setLLastLinkMark] = useState(linkMark),
    [linkHref, setLinkHref] = useState(href);

  useEffect(
    () => {
      const width = ref.current ? ref.current.offsetWidth : 0;
      const left = Math.abs(position.left - width / 2);

      //TODO Overwrite default position in order to position LinkOverlay
      // setPosition({ ...position, left });
      setLinkText();
      removeMarkIfEmptyHref();
    },
    [ref.current, href]
  );

  const addLink = () => {
    const href = linkHref;
    dispatch(
      state.tr
        .removeMark(mark.from, mark.to, state.schema.marks.link)
        .addMark(mark.from, mark.to, state.schema.marks.link.create({ href }))
    );
    main.focus();
  };

  const removeLink = () => {
    dispatch(state.tr.removeMark(mark.from, mark.to, state.schema.marks.link));
    main.focus();
  };

  const handleKeyDown = event => {
    if (event.key === "Enter" || event.which === 13) {
      addLink();
    }
  };

  const updateLink = () => {
    const { current: { value } } = linkInput;
    setLinkHref(value);
  };

  const setLinkText = () => {
    if (mark && mark.attrs.href !== "") {
      setButtonText("Update");
      setLinkHref(mark.attrs.href);
    } else {
      setButtonText("Create");
      setLinkHref("");
      if (linkInput.current) linkInput.current.focus();
    }
  };

  const removeMarkIfEmptyHref = () => {
    const { selection: { $from, $to } } = state;
    const PMLinkMark = state.schema.marks["link"];
    const actualMark = DocumentHelpers.findMark(state, PMLinkMark);
    setLLastLinkMark(actualMark);

    if (
      lastLinkMark.attrs.href === "" &&
      ($from.pos < lastLinkMark.from || $to.pos > lastLinkMark.to)
    ) {
      dispatch(
        state.tr
          .setMeta("addToHistory", false)
          .removeMark(
            lastLinkMark.from,
            lastLinkMark.to,
            state.schema.marks.link
          )
      );
    }
  };

  return mark ? (
    <LinkWrapper ref={ref}>
      <input
        type="text"
        ref={linkInput}
        onChange={updateLink}
        onKeyPress={handleKeyDown}
        value={linkHref}
      />
      <Button primary onClick={addLink}>
        {addButtonText}
      </Button>
      <Button onClick={removeLink}>Remove</Button>
    </LinkWrapper>
  ) : null;
};

export default LinkComponent;
