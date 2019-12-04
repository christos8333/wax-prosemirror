import React from "react";
import { v4 as uuid } from "uuid";
import {
  joinUp,
  lift,
  setBlockType,
  toggleMark,
  wrapIn,
  selectParentNode
} from "prosemirror-commands";

import { addColumnBefore } from "prosemirror-tables";

import { redo, undo } from "prosemirror-history";
import { wrapInList } from "prosemirror-schema-list";

import icons from "../icons/icons";
//Components
import Button from "../components/Button";
import TableDropDown from "../components/TableDropDown";
import ImageUpload from "../components/ImageUpload";

import {
  markActive,
  blockActive,
  canInsert,
  promptForURL,
  createTable
} from "./MainMenuCommands";

export default [
  {
    groupName: "undo-redo",
    tools: [
      {
        name: "undo",
        title: "Undo last change",
        content: icons.undo,
        enable: undo,
        run: undo,
        select: state => true,
        menu: props => <Button key={uuid()} {...props} />
      },
      {
        name: "redo",
        title: "Redo last undone change",
        content: icons.redo,
        enable: redo,
        run: redo,
        select: state => true,
        menu: props => <Button key={uuid()} {...props} />
      }
    ]
  },
  {
    groupName: "Annotations",
    tools: [
      {
        name: "em",
        title: "Toggle emphasis",
        content: icons.em,
        active: state => {
          return markActive(state.config.schema.marks.em)(state);
        },
        run(state, dispatch) {
          toggleMark(state.config.schema.marks.em)(state, dispatch);
        },
        select: state => true,
        menu: props => <Button key={uuid()} {...props} />
      },
      {
        name: "strong",
        title: "Toggle strong",
        content: icons.strong,
        active: state => {
          return markActive(state.config.schema.marks.strong)(state);
        },
        run(state, dispatch) {
          toggleMark(state.config.schema.marks.strong)(state, dispatch);
        },
        select: state => true,
        menu: props => <Button key={uuid()} {...props} />
      },
      {
        name: "code",
        title: "Toggle code",
        content: icons.code,
        active: state => {
          return markActive(state.config.schema.marks.code)(state);
        },
        run(state, dispatch) {
          toggleMark(state.config.schema.marks.code)(state, dispatch);
        },

        select: state => true,
        menu: props => <Button key={uuid()} {...props} />
      },
      {
        name: "small_caps",
        title: "Toggle Small Caps",
        content: icons.small_caps,
        active: state => {
          return markActive(state.config.schema.marks.small_caps)(state);
        },
        run(state, dispatch) {
          toggleMark(state.config.schema.marks.small_caps)(state, dispatch);
        },

        select: state => true,
        menu: props => <Button key={uuid()} {...props} />
      },
      {
        name: "subscript",
        title: "Toggle subscript",
        content: icons.subscript,
        active: state => {
          return markActive(state.config.schema.marks.subscript)(state);
        },
        run(state, dispatch) {
          toggleMark(state.config.schema.marks.subscript)(state, dispatch);
        },
        select: state => true,
        menu: props => <Button key={uuid()} {...props} />
      },
      {
        name: "superscript",
        title: "Toggle superscript",
        content: icons.superscript,
        active: state => {
          return markActive(state.config.schema.marks.superscript)(state);
        },
        run(state, dispatch) {
          toggleMark(state.config.schema.marks.superscript)(state, dispatch);
        },
        select: state => true,
        menu: props => <Button key={uuid()} {...props} />
      },
      {
        name: "underline",
        title: "Toggle underline",
        content: icons.underline,
        active: state => {
          return markActive(state.config.schema.marks.underline)(state);
        },
        run(state, dispatch) {
          toggleMark(state.config.schema.marks.underline)(state, dispatch);
        },

        select: state => true,
        menu: props => <Button key={uuid()} {...props} />
      },
      {
        name: "strikethrough",
        title: "Toggle strikethrough",
        content: icons.strikethrough,
        active: state => {
          return markActive(state.config.schema.marks.strikethrough)(state);
        },
        run(state, dispatch) {
          toggleMark(state.config.schema.marks.strikethrough)(state, dispatch);
        },
        select: state => true,
        menu: props => <Button key={uuid()} {...props} />
      },
      {
        name: "link",
        title: "Add or remove link",
        content: icons.link,
        active: state => {
          return markActive(state.config.schema.marks.link)(state);
        },
        enable: state => !state.selection.empty,
        run(state, dispatch) {
          if (markActive(state.config.schema.marks.link)(state)) {
            toggleMark(state.config.schema.marks.link)(state, dispatch);
            return true;
          }

          const href = promptForURL();
          if (!href) return false;

          toggleMark(state.config.schema.marks.link, { href })(state, dispatch);
        },
        select: state => true,
        menu: props => <Button key={uuid()} {...props} />
      },
      {
        name: "blockquote",
        title: "Wrap in block quote",
        content: icons.blockquote,
        active: state => {
          return blockActive(state.config.schema.nodes.blockquote)(state);
        },
        enable: state => {
          return wrapIn(state.config.schema.nodes.blockquote)(state);
        },
        run(state, dispatch) {
          wrapIn(state.config.schema.nodes.blockquote)(state, dispatch);
        },
        select: state => true,
        menu: props => <Button key={uuid()} {...props} />
      },
      {
        name: "bullet_list",
        title: "Wrap in bullet list",
        content: icons.bullet_list,
        active: state => {
          return blockActive(state.config.schema.nodes.bullet_list)(state);
        },
        enable: state => {
          return wrapInList(state.config.schema.nodes.bullet_list)(state);
        },
        run(state, dispatch) {
          wrapInList(state.config.schema.nodes.bullet_list)(state, dispatch);
        },
        select: state => true,
        menu: props => <Button key={uuid()} {...props} />
      },
      {
        name: "ordered_list",
        title: "Wrap in ordered list",
        content: icons.ordered_list,
        active: state => {
          return blockActive(state.config.schema.nodes.ordered_list)(state);
        },
        enable: state => {
          return wrapInList(state.config.schema.nodes.ordered_list)(state);
        },
        run(state, dispatch) {
          wrapInList(state.config.schema.nodes.ordered_list)(state, dispatch);
        },

        select: state => true,
        menu: props => <Button key={uuid()} {...props} />
      },
      {
        name: "lift",
        title: "Lift out of enclosing block",
        content: icons.lift,
        enable: lift,
        run: lift,
        select: state => lift(state),
        menu: props => <Button key={uuid()} {...props} />
      },
      {
        name: "join_up",
        title: "Join with above block",
        content: icons.join_up,
        select: state => joinUp(state),
        enable: joinUp,
        run: joinUp,
        menu: props => <Button key={uuid()} {...props} />
      },
      {
        name: "image",
        title: "Insert image",
        content: icons.image,
        enable: state => {
          return canInsert(state.config.schema.nodes.image)(state);
        },
        select: state => true,
        run: option => true,
        menu: props => <ImageUpload key={uuid()} {...props} />
      }
    ]
  },
  {
    groupName: "Table",
    tools: [
      {
        name: "table",
        title: "Insert table",
        content: icons.table,
        enable: state => {
          return canInsert(state.config.schema.nodes.table)(state);
        },
        run: (state, dispatch) => {
          return createTable(state, dispatch);
        },
        select: state => true,
        menu: props => <Button key={uuid()} {...props} />
      },
      {
        name: "tableDropDownOptions",
        content: "table",
        run: option => true,
        title: "Select Options",
        select: state => addColumnBefore(state),
        menu: props => <TableDropDown key={uuid()} {...props} />
      }
    ]
  }
];

{
  [
    {
      templateArea: "topBar",
      tools: ["redo", "undo"],
      groups: [
        "redo-undo",
        "annotations",
        { group: "Annotation", exclude: [], include: [] }
      ]
    }
  ];
}
