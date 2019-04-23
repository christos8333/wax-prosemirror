import { history } from "prosemirror-history";
import { dropCursor } from "prosemirror-dropcursor";
import { gapCursor } from "prosemirror-gapcursor";
import "prosemirror-gapcursor/style/gapcursor.css";
import placeholderPlugin from "./plugins/placeholderPlugin";

// import rules from "./rules";

export default [
  // rules,
  dropCursor(),
  gapCursor(),
  history(),
  placeholderPlugin
];
