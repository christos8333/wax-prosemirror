import React from "react";
import { v4 as uuid } from "uuid";
import { setBlockType } from "prosemirror-commands";

import Button from "../components/button/Button";

const blockActive = (type, attrs = {}) => state => {
  const { $from, to, node } = state.selection;

  if (node) {
    return node.hasMarkup(type, attrs);
  }
  console.log("type", $from.end());
  // console.log(to <= $from.end() && $from.parent.hasMarkup(type, attrs));
  return to <= $from.end() && $from.parent.hasMarkup(type, attrs);
};

export default {
  plain: {
    title: "Change to General Text",
    // content: icons.paragraph,
    content: "General Text",
    active: state => {
      return blockActive(state.config.schema.nodes.paragraph)(state);
    },
    // enable: setBlockType(schema.nodes.paragraph),
    run(state, dispatch) {
      setBlockType(state.config.schema.nodes.paragraph)(state, dispatch);
    },

    select: state => true,
    menu: props => <Button key={uuid()} {...props} />
  },
  subtitle: {
    title: "Change to Subtilte",
    content: "Subtilte",
    active: state => {
      return blockActive(state.config.schema.nodes.subtitle)(state);
    },
    run(state, dispatch) {
      setBlockType(state.config.schema.nodes.subtitle)(state, dispatch);
    },
    select: state => true,
    menu: props => <Button key={uuid()} {...props} />
  },
  heading1: {
    title: "Change to heading level 1",
    content: "Heading 1",
    active: state => {
      return blockActive(state.config.schema.nodes.heading, { level: 1 })(
        state
      );
    },
    // enable: setBlockType(schema.nodes.heading, { level: 1 }),
    run(state, dispatch) {
      setBlockType(state.config.schema.nodes.heading, { level: 1 })(
        state,
        dispatch
      );
    },
    select: state => true,
    menu: props => <Button key={uuid()} {...props} />
  },
  heading2: {
    title: "Change to heading level 2",
    content: "Heading 2",
    active: state => {
      return blockActive(state.config.schema.nodes.heading, { level: 2 })(
        state
      );
    },
    // enable: setBlockType(schema.nodes.heading, { level: 2 }),
    run(state, dispatch) {
      setBlockType(state.config.schema.nodes.heading, { level: 2 })(
        state,
        dispatch
      );
    },
    select: state => true,
    menu: props => <Button key={uuid()} {...props} />
  },
  heading3: {
    title: "Change to heading level 3",
    content: "Heading 3",
    active: state => {
      return blockActive(state.config.schema.nodes.heading, { level: 3 })(
        state
      );
    },
    // enable: setBlockType(schema.nodes.heading, { level: 3 }),
    run(state, dispatch) {
      setBlockType(state.config.schema.nodes.heading, { level: 3 })(
        state,
        dispatch
      );
    },
    select: state => true,
    menu: props => <Button key={uuid()} {...props} />
  }
};
