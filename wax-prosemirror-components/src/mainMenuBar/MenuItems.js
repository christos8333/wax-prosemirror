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
import Button from "../components/button/Button";
import TableDropDown from "../components/TableDropDown";
import ImageUpload from "../components/ImageUpload";
import HeadingsDropDown from "../components/HeadingsDropDown";

const markActive = type => state => {
  const { from, $from, to, empty } = state.selection;
  return empty
    ? type.isInSet(state.storedMarks || $from.marks())
    : state.doc.rangeHasMark(from, to, type);
};

const blockActive = (type, attrs = {}) => state => {
  const { $from, to, node } = state.selection;

  if (node) {
    return node.hasMarkup(type, attrs);
  }

  return to <= $from.end() && $from.parent.hasMarkup(type, attrs);
};

const canInsert = type => state => {
  const { $from } = state.selection;

  for (let d = $from.depth; d >= 0; d--) {
    const index = $from.index(d);

    if ($from.node(d).canReplaceWith(index, index, type)) {
      return true;
    }
  }

  return false;
};

const promptForURL = () => {
  let url = window && window.prompt("Enter the URL", "https://");

  if (url && !/^https?:\/\//i.test(url)) {
    url = "http://" + url;
  }

  return url;
};

const TopMenuItems = state => {
  return {
    undo: {
      title: "Undo last change",
      content: icons.undo,
      enable: undo,
      run: undo,
      select: state => true,
      menu: props => <Button key={uuid()} {...props} />
    },
    redo: {
      title: "Redo last undone change",
      content: icons.redo,
      enable: redo,
      run: redo,
      select: state => true,
      menu: props => <Button key={uuid()} {...props} />
    },
    headings: {
      title: "Change to heading level 1",
      content: icons.heading,
      // active: blockActive(schema.nodes.heading, { level: 1 }),
      // enable: setBlockType(schema.nodes.heading, { level: 1 }),
      run: option => true,
      select: state => true,
      menu: props => <HeadingsDropDown key={uuid()} {...props} />
    },

    plain: {
      title: "Change to General Text",
      // content: icons.paragraph,
      content: "General Text",
      // active: blockActive(schema.nodes.paragraph),
      // enable: setBlockType(schema.nodes.paragraph),
      run(state, dispatch) {
        setBlockType(state.config.schema.nodes.paragraph)(state, dispatch);
      },

      select: state => true,
      menu: props => <Button key={uuid()} {...props} />
    },

    em: {
      title: "Toggle emphasis",
      content: icons.em,
      active: markActive(state.config.schema.marks.em),
      run(state, dispatch) {
        toggleMark(state.config.schema.marks.em)(state, dispatch);
      },
      select: state => true,
      menu: props => <Button key={uuid()} {...props} />
    },
    strong: {
      title: "Toggle strong",
      content: icons.strong,
      // active: markActive(schema.marks.strong),
      run(state, dispatch) {
        toggleMark(state.config.schema.marks.strong)(state, dispatch);
      },
      select: state => true,
      menu: props => <Button key={uuid()} {...props} />
    },
    code: {
      title: "Toggle code",
      content: icons.code,
      // active: markActive(schema.marks.code),
      run(state, dispatch) {
        toggleMark(state.config.schema.marks.code)(state, dispatch);
      },

      select: state => true,
      menu: props => <Button key={uuid()} {...props} />
    },
    source: {
      title: "Toggle Source",
      content: icons.source,
      // active: markActive(schema.marks.code),
      run(state, dispatch) {
        toggleMark(state.config.schema.marks.source)(state, dispatch);
      },

      select: state => true,
      menu: props => <Button key={uuid()} {...props} />
    },
    small_caps: {
      title: "Toggle Small Caps",
      content: icons.small_caps,
      // active: markActive(schema.marks.code),
      run(state, dispatch) {
        toggleMark(state.config.schema.marks.small_caps)(state, dispatch);
      },

      select: state => true,
      menu: props => <Button key={uuid()} {...props} />
    },
    subscript: {
      title: "Toggle subscript",
      content: icons.subscript,
      // active: markActive(schema.marks.subscript),
      run(state, dispatch) {
        toggleMark(state.config.schema.marks.subscript)(state, dispatch);
      },
      select: state => true,
      menu: props => <Button key={uuid()} {...props} />
    },
    superscript: {
      title: "Toggle superscript",
      content: icons.superscript,
      // active: markActive(schema.marks.superscript),
      run(state, dispatch) {
        toggleMark(state.config.schema.marks.superscript)(state, dispatch);
      },
      select: state => true,
      menu: props => <Button key={uuid()} {...props} />
    },
    underline: {
      title: "Toggle underline",
      content: icons.underline,
      // active: markActive(schema.marks.underline),
      run(state, dispatch) {
        toggleMark(state.config.schema.marks.underline)(state, dispatch);
      },

      select: state => true,
      menu: props => <Button key={uuid()} {...props} />
    },
    strikethrough: {
      title: "Toggle strikethrough",
      content: icons.strikethrough,
      // active: markActive(schema.marks.strikethrough),
      run(state, dispatch) {
        toggleMark(state.config.schema.marks.strikethrough)(state, dispatch);
      },
      select: state => true,
      menu: props => <Button key={uuid()} {...props} />
    },
    link: {
      title: "Add or remove link",
      content: icons.link,
      // active: markActive(schema.marks.link),
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
    codeBlock: {
      title: "Change to code block",
      content: icons.code_block,
      // active: blockActive(schema.nodes.code_block),
      // enable: setBlockType(schema.nodes.code_block),
      run(state, dispatch) {
        wrapIn(state.config.schema.nodes.codeBlock)(state, dispatch);
      },

      select: state => true,
      menu: props => <Button key={uuid()} {...props} />
    },

    blockquote: {
      title: "Wrap in block quote",
      content: icons.blockquote,
      // active: blockActive(schema.nodes.blockquote),
      // enable: wrapIn(schema.nodes.blockquote),
      run(state, dispatch) {
        wrapIn(state.config.schema.nodes.blockquote)(state, dispatch);
      },
      select: state => true,
      menu: props => <Button key={uuid()} {...props} />
    },
    bullet_list: {
      title: "Wrap in bullet list",
      content: icons.bullet_list,
      // active: blockActive(schema.nodes.bullet_list),
      // enable: wrapInList(schema.nodes.bullet_list),
      run(state, dispatch) {
        wrapInList(state.config.schema.nodes.bullet_list)(state, dispatch);
      },
      select: state => true,
      menu: props => <Button key={uuid()} {...props} />
    },
    ordered_list: {
      title: "Wrap in ordered list",
      content: icons.ordered_list,
      // active: blockActive(schema.nodes.ordered_list),
      // enable: wrapInList(schema.nodes.ordered_list),
      run(state, dispatch) {
        wrapInList(state.config.schema.nodes.ordered_list)(state, dispatch);
      },

      select: state => true,
      menu: props => <Button key={uuid()} {...props} />
    },
    lift: {
      title: "Lift out of enclosing block",
      content: icons.lift,
      enable: lift,
      run: lift,
      select: state => lift(state),
      menu: props => <Button key={uuid()} {...props} />
    },
    join_up: {
      title: "Join with above block",
      content: icons.join_up,
      select: state => joinUp(state),
      enable: joinUp,
      run: joinUp,
      menu: props => <Button key={uuid()} {...props} />
    },
    image: {
      title: "Insert image",
      content: icons.image,
      // enable: canInsert(schema.nodes.image),
      select: state => true,
      run: option => true,
      menu: props => <ImageUpload key={uuid()} {...props} />
    }
  };
};

export default TopMenuItems;
