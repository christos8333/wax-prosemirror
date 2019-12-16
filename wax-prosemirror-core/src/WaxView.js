import React, { Component } from "react";
import applyDevTools from "prosemirror-dev-tools";

import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";

import "prosemirror-view/style/prosemirror.css";
import trackedTransaction from "./track-changes/trackedTransaction";

class WaxView extends Component {
  constructor(props) {
    super(props);
    const { readonly, onBlur } = this.props;
    const { options } = props;
    this.editorRef = React.createRef();

    // Create view of Editor
    this.view = new EditorView(null, {
      editable: () => !readonly,
      state: EditorState.create(options),
      dispatchTransaction: this.dispatchTransaction,
      handleDOMEvents: {
        blur: onBlur
          ? view => {
              onBlur(view.state.doc.content);
            }
          : null
      }
    });
  }

  componentDidMount() {
    const { autoFocus, debug } = this.props;
    this.editorRef.current.appendChild(this.view.dom);

    if (debug) applyDevTools(this.view);
    if (autoFocus) this.view.focus();
  }

  dispatchTransaction = transaction => {
    const { TrackChange } = this.props;
    const tr = TrackChange
      ? trackedTransaction(transaction, this.view.state, this)
      : transaction;
    const state = this.view.state.apply(tr);
    this.view.updateState(state);
    this.props.onChange(state.doc.content);
    this.forceUpdate();
  };

  render() {
    const editor = <span ref={this.editorRef} />;
    return this.props.children({
      view: this.view,
      editor
    });
  }
}

export default WaxView;
