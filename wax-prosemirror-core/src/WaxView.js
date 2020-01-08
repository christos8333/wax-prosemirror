import React, {
  useEffect,
  useState,
  useRef,
  useContext,
  Component
} from "react";
import ReactDOM from "react-dom";
import applyDevTools from "prosemirror-dev-tools";

import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";

import "prosemirror-view/style/prosemirror.css";
import trackedTransaction from "./track-changes/trackedTransaction";
import { WaxContext } from "./ioc-react";

export default props => {
  const { readonly, onBlur, options, debug, autoFocus, WaxRender } = props;
  const editorRef = useRef();

  const context = useContext(WaxContext);

  useEffect(() => {
    const view = new EditorView(
      { mount: editorRef.current },
      {
        editable: () => !readonly,
        state: EditorState.create(options),
        dispatchTransaction: transaction => {
          const { TrackChange } = props;
          const tr = TrackChange
            ? trackedTransaction(transaction, view.state, this)
            : transaction;

          const state = view.state.apply(tr);
          view.updateState(state);
          context.updateView(view);

          props.onChange(state.doc.content);
        },
        handleDOMEvents: {
          blur: onBlur
            ? view => {
                onBlur(view.state.doc.content);
              }
            : null
        }
      }
    );
    context.updateView(view);

    if (debug) applyDevTools(view);
    if (autoFocus) view.focus();
  }, []);

  const editor = <div ref={editorRef}></div>;
  return props.children({
    editor
  });
};
