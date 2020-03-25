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
import CommentsBoxList from "./CommentsBoxList";

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
    () => <CommentsBoxList comments={comments} view={main} />,
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
