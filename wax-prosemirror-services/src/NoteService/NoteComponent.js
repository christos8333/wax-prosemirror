import React, { useContext, useState, useEffect, useMemo } from "react";
import { WaxContext } from "wax-prosemirror-core/src/ioc-react";
import { isEqual } from "lodash";
import NoteEditor from "./NoteEditor";

export default () => {
  const {
    view: { main }
  } = useContext(WaxContext);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    setNotes(updateNotes(main));
  }, [JSON.stringify(updateNotes(main))]);

  const noteComponent = useMemo(
    () => <NoteEditor notes={notes} view={main} />,
    [notes]
  );

  return <div>{noteComponent}</div>;
};

const updateNotes = view => {
  if (view) {
    return findBlockNodes(
      view.state.doc,
      view.state.schema.nodes.footnote,
      true
    );
  }
  return [];
};

export const flatten = (node, descend = true) => {
  if (!node) {
    throw new Error('Invalid "node" parameter');
  }
  const result = [];
  node.descendants((child, pos) => {
    result.push({ node: child, pos });
    if (!descend) {
      return false;
    }
  });
  return result;
};

export const findChildren = (node, predicate, descend) => {
  if (!node) {
    throw new Error('Invalid "node" parameter');
  } else if (!predicate) {
    throw new Error('Invalid "predicate" parameter');
  }
  return flatten(node, descend).filter(child => {
    // predicate(child.node)console.log(child.node);
    // return predicate(child.node);
    // console.log(child.node.type.name === "footnote", predicate(child.node));
    return child.node.type.name === "footnote" ? child.node : false;
  });
};

export const findBlockNodes = (node, descend) => {
  return findChildren(node, child => child.isBlock, descend);
};
