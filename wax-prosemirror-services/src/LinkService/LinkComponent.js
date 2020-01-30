import React, { useRef, useEffect } from "react";
import styled from "styled-components";
// import { Button } from "wax-prosemirror-components";

const LinkWrapper = styled.div`
  padding: 20px;
  border-radius: 3px;
  border: 1px solid #000;
  background: grey;
  z-index: 9999;
`;

const Button = styled.button``;

const LinkComponent = ({ mark, setPosition, position }) => {
  const ref = useRef(null);

  useEffect(
    () => {
      const width = ref.current ? ref.current.offsetWidth : 0;
      const left = Math.abs(position.left - width / 2);

      setPosition({ ...position, left });
    },
    [ref.current]
  );

  return mark ? (
    <LinkWrapper ref={ref}>
      <input type="text" onChange={() => {}} value={mark.attrs.href} />
      <Button primary>Change</Button>
      <Button>Cancel</Button>
    </LinkWrapper>
  ) : null;
};

export default LinkComponent;
