import React, { Component } from "react";
import applyDevTools from "prosemirror-dev-tools";

import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";

import placeholderPlugin from "./config/plugins/placeholderPlugin";
import "prosemirror-view/style/prosemirror.css";
import "prosemirror-gapcursor/style/gapcursor.css";

class WaxView extends Component {
  constructor(props) {
    super(props);
    const { readonly, onBlur } = this.props;

    this.editorRef = React.createRef();

    // Create view of Editor
    this.view = new EditorView(null, {
      editable: () => !readonly,
      state: EditorState.create(props.options),
      dispatchTransaction: this.dispatchTransaction,
      fileUpload: this.uploadImage,
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

  uploadImage = file => {
    const { state } = this.view;
    const { findPlaceholder } = this;
    const { fileUpload } = this.props;

    // A fresh object to act as the ID for this upload
    const id = {};

    // Replace the selection with a placeholder
    const { tr } = state;
    if (!tr.selection.empty) tr.deleteSelection();

    tr.setMeta(placeholderPlugin, {
      add: { id, pos: tr.selection.from }
    });

    this.view.dispatch(tr);

    fileUpload(file).then(
      url => {
        const pos = findPlaceholder(this.view.state, id);
        // If the content around the placeholder has been deleted, drop
        // the image
        if (pos == null) {
          return;
        }
        // Otherwise, insert it at the placeholder's position, and remove
        // the placeholder
        this.view.dispatch(
          state.tr
            .replaceWith(
              pos,
              pos,
              this.view.state.schema.nodes.image.create({
                src: url
              })
            )
            .setMeta(placeholderPlugin, { remove: { id } })
        );
      },
      () => {
        // On failure, just clean up the placeholder
        this.view.dispatch(tr.setMeta(placeholderPlugin, { remove: { id } }));
      }
    );
  };

  findPlaceholder = (state, id) => {
    const decos = placeholderPlugin.getState(state);
    const found = decos.find(null, null, spec => spec.id === id);
    return found.length ? found[0].from : null;
  };

  dispatchTransaction = transaction => {
    const state = this.view.state.apply(transaction);
    this.view.updateState(state);
    this.props.onChange(state.doc.content);
    this.forceUpdate();
  };

  render() {
    const { theme } = this.props;
    const WaxTheme = theme
      ? `wax-surface-scroll wax-t-${theme}`
      : "wax-surface-scroll";

    const editor = <div ref={this.editorRef} className={WaxTheme} />;
    return this.props.children({
      view: this.view,
      fileUpload: this.uploadImage,
      editor
    });
  }
}

export default WaxView;
