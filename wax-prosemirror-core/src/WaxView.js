import React, { useEffect, useRef, useContext } from "react";

import applyDevTools from "prosemirror-dev-tools";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";

import "prosemirror-view/style/prosemirror.css";

import { trackedTransaction } from "wax-prosemirror-services";
import { WaxContext } from "./WaxContext";
import transformPasted from "./helpers/TransformPasted";

export default props => {
  const {
    readonly,
    onBlur,
    options,
    debug,
    autoFocus,
    TrackChange,
    user
  } = props;

  const editorRef = useRef();
  let view;
  const context = useContext(WaxContext);

  useEffect(() => {
    view = new EditorView(
      { mount: editorRef.current },
      {
        editable: () => !readonly,
        state: EditorState.create(options),
        dispatchTransaction,
        user,
        handleDOMEvents: {
          blur: onBlur
            ? view => {
                onBlur(view.state.doc.content);
              }
            : null
        },
        transformPasted: slice => {
          return transformPasted(slice, view);
        }
      }
    );

    context.updateView(
      {
        main: view
      },
      "main"
    );
    if (debug) applyDevTools(view);
    if (autoFocus) view.focus();

    return () => view.destroy();
  }, []);

  const dispatchTransaction = transaction => {
    /*when a transaction comes from a view other than
    main don't keep updating the view ,as this this
    the central point of each transaction
    */
    if (!transaction.getMeta("outsideView")) {
      context.updateView(
        {
          main: view
        },
        "main"
      );
    }

    const tr = { props: { TrackChange } }
      ? trackedTransaction(transaction, view.state, user)
      : transaction;

    const state = view.state.apply(tr);
    view.updateState(state);

    props.onChange(state.doc.content);
  };

  const editor = <div ref={editorRef} />;
  return props.children({
    editor
  });
};
