import { history } from "prosemirror-history";
import { dropCursor } from "prosemirror-dropcursor";
import { gapCursor } from "prosemirror-gapcursor";
import "prosemirror-gapcursor/style/gapcursor.css";

//TODO remove everything in comments
// import "prosemirror-tables/style/tables.css";
import placeholderPlugin from "./plugins/placeholderPlugin";
// import { columnResizing, tableEditing } from "prosemirror-tables";

// import rules from "./rules";

export default [
  // rules,
  dropCursor(),
  gapCursor(),
  history(),
  placeholderPlugin
  // columnResizing(),
  // tableEditing()
];

// for tables
// document.execCommand("enableObjectResizing", false, false);
// document.execCommand("enableInlineTableEditing", false, false);
