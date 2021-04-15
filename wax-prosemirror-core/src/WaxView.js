import React, {
  useRef,
  useContext,
  useCallback,
  useMemo,
  useEffect,
} from 'react';

import applyDevTools from 'prosemirror-dev-tools';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import 'prosemirror-view/style/prosemirror.css';
import { trackedTransaction } from 'wax-prosemirror-services';

import ComponentPlugin from './ComponentPlugin';
import { WaxContext } from './WaxContext';
import { PortalContext } from './PortalContext';
import transformPasted from './helpers/TransformPasted';
import WaxOptions from './WaxOptions';

let previousDoc;

export default props => {
  const {
    readonly,
    onBlur,
    options,
    debug,
    autoFocus,
    user,
    targetFormat,
    nodeViews,
  } = props;

export default props => {
  const { readonly, onBlur, debug, autoFocus, user, targetFormat } = props;
  const editorRef = useRef();

  const context = useContext(WaxContext);
  const { createPortal } = useContext(PortalContext);

  context.app.setContext({ ...context, createPortal });

  const schema = context.app.getSchema();

  if (!view) {
    context.app.bootServices();
  }

  const setEditorRef = useCallback(
    // eslint-disable-next-line consistent-return
    node => {
      if (editorRef.current) {
        // this is where you do cleanup if you have to. the editorRef.current will
        // still point to the old ref, the old node. so you have some time here to
        // clean up the unmount if you need to.
      }
      if (node) {
        const options = WaxOptions({
          ...props,
          schema,
          plugins: context.app.getPlugins(),
        });

        view = new EditorView(
          { mount: node },
          {
            editable: () => !readonly,
            state: EditorState.create(options),
            dispatchTransaction,
            user,
            scrollMargin: 200,
            scrollThreshold: 200,
            handleDOMEvents: {
              blur: onBlur
                ? // eslint-disable-next-line no-shadow
                  view => {
                    onBlur(view.state.doc.content);
                  }
                : null,
            },
            transformPasted: slice => {
              return transformPasted(slice, view);
            },
            attributes: {
              spellcheck: 'false',
            },
          },
        );

        context.updateView(
          {
            main: view,
          },
          'main',
        );
        if (debug) applyDevTools(view);
        if (autoFocus)
          setTimeout(() => {
            view.focus();
          }, 1000);

        return () => view.destroy();
      }
      editorRef.current = node;
    },
    [readonly],
  );

  const dispatchTransaction = transaction => {
    const { TrackChange } = props;
    const tr =
      TrackChange && TrackChange.enabled
        ? trackedTransaction(transaction, view.state, user)
        : transaction;

    previousDoc = view.state.doc;
    const state = view.state.apply(tr);
    view.updateState(state);

    /* when a transaction comes from a view other than
      main don't keep updating the view ,as this is
      the central point of each transaction
      */
    if (!transaction.getMeta('outsideView')) {
      context.updateView(
        {
          main: view,
        },
        'main',
      );
    }
    if (view.state.doc !== previousDoc || tr.getMeta('forceUpdate'))
      props.onChange(state.doc.content);

    if (targetFormat === 'JSON') {
      props.onChange(state.doc.toJSON());
    } else {
      props.onChange(state.doc.content);
    }
  };

  const editor = (
    <>
      <div ref={setEditorRef} />
      <WaxPortals />
    </>
  );

  return useMemo(
    () =>
      props.children({
        editor,
      }),
    [readonly],
  );
};
