import { history } from "prosemirror-history";
import { dropCursor } from "prosemirror-dropcursor";
import { gapCursor } from "prosemirror-gapcursor";
import "prosemirror-gapcursor/style/gapcursor.css";
import placeholderPlugin from "./plugins/placeholderPlugin";

export default [dropCursor(), gapCursor(), history(), placeholderPlugin];
