import CodeMirror from "codemirror";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/css/css.js";
import "codemirror/mode/htmlmixed/htmlmixed.js";

import "codemirror/keymap/sublime.js";

import "codemirror/addon/hint/show-hint.js";
import "codemirror/addon/hint/javascript-hint.js";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/cobalt.css";
import "codemirror/addon/hint/show-hint.css";
import { exitCode } from "prosemirror-commands";
import { undo, redo } from "prosemirror-history";
import { TextSelection } from "prosemirror-state";
import { keymap } from "prosemirror-keymap";

// import WaxSchema from "./WaxSchema";

// const schema = WaxSchema();

class CodeBlockView {
  constructor(node, view, getPos) {
    console.log("test");
    // Store for later
    this.node = node;
    this.view = view;
    this.getPos = getPos;
    this.incomingChanges = false;

    // Create a CodeMirror instance
    this.cm = new CodeMirror(null, {
      value: this.node.textContent,
      lineNumbers: true,
      theme: "cobalt",
      extraKeys: this.codeMirrorKeymap()
    });

    // The editor's outer node is our DOM representation
    this.dom = this.cm.getWrapperElement();
    // CodeMirror needs to be in the DOM to properly initialize, so
    // schedule it to update itself
    setTimeout(() => this.cm.refresh(), 20);

    // This flag is used to avoid an update loop between the outer and
    // inner editor
    this.updating = false;
    // Track whether changes are have been made but not yet propagated
    this.cm.on("beforeChange", () => (this.incomingChanges = true));
    // Propagate updates from the code editor to ProseMirror
    this.cm.on("cursorActivity", () => {
      if (!this.updating && !this.incomingChanges) this.forwardSelection();
    });
    this.cm.on("changes", () => {
      if (!this.updating) {
        this.valueChanged();
        this.forwardSelection();
      }
      this.incomingChanges = false;
    });
    this.cm.on("focus", () => this.forwardSelection());
  }

  forwardSelection() {
    if (!this.cm.hasFocus()) return;
    let state = this.view.state;
    let selection = this.asProseMirrorSelection(state.doc);
    if (!selection.eq(state.selection))
      this.view.dispatch(state.tr.setSelection(selection));
  }

  asProseMirrorSelection(doc) {
    let offset = this.getPos() + 1;
    let anchor = this.cm.indexFromPos(this.cm.getCursor("anchor")) + offset;
    let head = this.cm.indexFromPos(this.cm.getCursor("head")) + offset;
    return TextSelection.create(doc, anchor, head);
  }

  setSelection(anchor, head) {
    this.cm.focus();
    this.updating = true;
    this.cm.setSelection(
      this.cm.posFromIndex(anchor),
      this.cm.posFromIndex(head)
    );
    this.updating = false;
  }

  valueChanged() {
    let change = computeChange(this.node.textContent, this.cm.getValue());
    if (change) {
      let start = this.getPos() + 1;
      let tr = this.view.state.tr.replaceWith(
        start + change.from,
        start + change.to,
        change.text ? schema.text(change.text) : null
      );
      this.view.dispatch(tr);
    }
  }

  codeMirrorKeymap() {
    let view = this.view;
    let mod = /Mac/.test(navigator.platform) ? "Cmd" : "Ctrl";
    return CodeMirror.normalizeKeyMap({
      Up: () => this.maybeEscape("line", -1),
      Left: () => this.maybeEscape("char", -1),
      Down: () => this.maybeEscape("line", 1),
      Right: () => this.maybeEscape("char", 1),
      [`${mod}-Z`]: () => undo(view.state, view.dispatch),
      [`Shift-${mod}-Z`]: () => redo(view.state, view.dispatch),
      [`${mod}-Y`]: () => redo(view.state, view.dispatch),
      "Ctrl-Enter": () => {
        if (exitCode(view.state, view.dispatch)) view.focus();
      }
    });
  }

  maybeEscape(unit, dir) {
    let pos = this.cm.getCursor();
    if (
      this.cm.somethingSelected() ||
      pos.line != (dir < 0 ? this.cm.firstLine() : this.cm.lastLine()) ||
      (unit == "char" &&
        pos.ch != (dir < 0 ? 0 : this.cm.getLine(pos.line).length))
    )
      return CodeMirror.Pass;
    this.view.focus();
    let targetPos = this.getPos() + (dir < 0 ? 0 : this.node.nodeSize);
    let selection = Selection.near(this.view.state.doc.resolve(targetPos), dir);
    this.view.dispatch(
      this.view.state.tr.setSelection(selection).scrollIntoView()
    );
    this.view.focus();
  }

  update(node) {
    if (node.type != this.node.type) return false;
    this.node = node;
    let change = computeChange(this.cm.getValue(), node.textContent);
    if (change) {
      this.updating = true;
      this.cm.replaceRange(
        change.text,
        this.cm.posFromIndex(change.from),
        this.cm.posFromIndex(change.to)
      );
      this.updating = false;
    }
    return true;
  }
  selectNode() {
    this.cm.focus();
  }
  stopEvent() {
    return true;
  }
}

function computeChange(oldVal, newVal) {
  if (oldVal == newVal) return null;
  let start = 0,
    oldEnd = oldVal.length,
    newEnd = newVal.length;
  while (start < oldEnd && oldVal.charCodeAt(start) == newVal.charCodeAt(start))
    ++start;
  while (
    oldEnd > start &&
    newEnd > start &&
    oldVal.charCodeAt(oldEnd - 1) == newVal.charCodeAt(newEnd - 1)
  ) {
    oldEnd--;
    newEnd--;
  }
  return { from: start, to: oldEnd, text: newVal.slice(start, newEnd) };
}

function arrowHandler(dir) {
  return (state, dispatch, view) => {
    if (state.selection.empty && view.endOfTextblock(dir)) {
      let side = dir == "left" || dir == "up" ? -1 : 1,
        $head = state.selection.$head;
      let nextPos = Selection.near(
        state.doc.resolve(side > 0 ? $head.after() : $head.before()),
        side
      );
      if (nextPos.$head && nextPos.$head.parent.type.name == "codeMirrorNode") {
        dispatch(state.tr.setSelection(nextPos));
        return true;
      }
    }
    return false;
  };
}

const arrowHandlers = keymap({
  ArrowLeft: arrowHandler("left"),
  ArrowRight: arrowHandler("right"),
  ArrowUp: arrowHandler("up"),
  ArrowDown: arrowHandler("down")
});

export default CodeBlockView;
