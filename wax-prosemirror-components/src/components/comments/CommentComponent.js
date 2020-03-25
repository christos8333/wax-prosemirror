import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
  Fragment
} from "react";
import styled from "styled-components";
import { WaxContext } from "wax-prosemirror-core/src/ioc-react";
import { DocumentHelpers } from "wax-prosemirror-utilities";

const CommentComponentStyled = styled.div`
  width: 100px;
  height: 100px;
  background: black;
  display: flex;
  flex-direction: row;
`;

export default () => {
  const { view: { main } } = useContext(WaxContext);
  const [comments, setComments] = useState([]);
  useEffect(
    () => {
      setComments(updateComments(main));
    },

    [JSON.stringify(updateComments(main))]
  );

  const CommentComponent = useMemo(
    () => <CommentComponentStyled view={main} />,
    [comments]
  );
  return <Fragment>{CommentComponent}</Fragment>;
};

const updateComments = view => {
  if (view) {
    // TODO find comments
  }
  return [];
};
