import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
  Fragment
} from "react";
import styled from "styled-components";
import { groupBy } from "lodash";
import { WaxContext } from "wax-prosemirror-core/src/ioc-react";
import { DocumentHelpers } from "wax-prosemirror-utilities";
import CommentsBoxList from "./CommentsBoxList";

export default ({ area }) => {
  const { view: { main } } = useContext(WaxContext);
  const [comments, setComments] = useState([]);
  useEffect(
    () => {
      setComments(updateComments(main, area));
    },

    [JSON.stringify(updateComments(main, area))]
  );

  const CommentComponent = useMemo(
    () => <CommentsBoxList comments={comments[area] || []} view={main} />,
    [comments[area] || []]
  );
  return <Fragment>{CommentComponent}</Fragment>;
};

const updateComments = (view, area) => {
  if (view) {
    const nodes = DocumentHelpers.findChildrenByMark(
      view.state.doc,
      view.state.schema.marks.comment,
      true
    );

    const allComments = nodes.map(node => {
      return node.node.marks.filter(comment => {
        return comment.type.name === "comment";
      });
    });

    const groupedComments = {};
    allComments.forEach(comment => {
      if (!groupedComments[comment[0].attrs.group]) {
        groupedComments[comment[0].attrs.group] = [comment[0]];
      } else {
        groupedComments[comment[0].attrs.group].push(comment[0]);
      }
    });

    return groupedComments;
  }
  return [];
};
