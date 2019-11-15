import React from "react";
import { v4 as uuid } from "uuid";
import { setBlockType } from "prosemirror-commands";

import Button from "../components/Button";
import { blockActive } from "./SideMenuItems";
export default {
  title: {
    title: "Change to Title",
    content: "Title",
    group: "",
    enable: state => {
      return setBlockType(state.config.schema.nodes.title)(state);
    },
    run(state, dispatch) {
      setBlockType(state.config.schema.nodes.title)(state, dispatch);
    },

    select: state => true,
    menu: props => <Button key={uuid()} {...props} />
  },
  subtitle: {
    title: "Change to Subtilte",
    content: "Subtilte",
    group: "",
    enable: state => {
      return setBlockType(state.config.schema.nodes.subtitle)(state);
    },
    run(state, dispatch) {
      setBlockType(state.config.schema.nodes.subtitle)(state, dispatch);
    },
    select: state => true,
    menu: props => <Button key={uuid()} {...props} />
  },
  author: {
    title: "Change to Author",
    content: "Author",
    group: "",
    enable: state => {
      return setBlockType(state.config.schema.nodes.author)(state);
    },
    run(state, dispatch) {
      setBlockType(state.config.schema.nodes.author)(state, dispatch);
    },
    select: state => true,
    menu: props => <Button key={uuid()} {...props} />
  },
  epigraphPoetry: {
    title: "Change to Epigraph Poetry",
    content: "Epigraph Poetry",
    group: "",
    enable: state => {
      return setBlockType(state.config.schema.nodes.epigraphPoetry)(state);
    },
    run(state, dispatch) {
      setBlockType(state.config.schema.nodes.epigraphPoetry)(state, dispatch);
    },
    select: state => true,
    menu: props => <Button key={uuid()} {...props} />
  },
  epigraphProse: {
    title: "Change to Epigraph Prose",
    content: "Epigraph Prose",
    group: "",
    enable: state => {
      return setBlockType(state.config.schema.nodes.epigraphProse)(state);
    },
    run(state, dispatch) {
      setBlockType(state.config.schema.nodes.epigraphProse)(state, dispatch);
    },
    select: state => true,
    menu: props => <Button key={uuid()} {...props} />
  },
  plain: {
    title: "Change to General Text",
    content: "General Text",
    group: "",
    enable: state => {
      return setBlockType(state.config.schema.nodes.paragraph)(state);
    },
    run(state, dispatch) {
      setBlockType(state.config.schema.nodes.paragraph)(state, dispatch);
    },

    select: state => true,
    menu: props => <Button key={uuid()} {...props} />
  },
  heading1: {
    title: "Change to heading level 1",
    content: "Heading 1",
    group: "",
    enable: state => {
      return setBlockType(state.config.schema.nodes.heading, {
        level: 1,
        track: []
      })(state);
    },
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
    group: "",
    enable: state => {
      return setBlockType(state.config.schema.nodes.heading, {
        level: 2,
        track: []
      })(state);
    },
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
    group: "",
    enable: state => {
      return setBlockType(state.config.schema.nodes.heading, {
        level: 3,
        track: []
      })(state);
    },
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
