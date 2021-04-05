import React, { useRef, useContext, useCallback, useMemo } from 'react';

import applyDevTools from 'prosemirror-dev-tools';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import 'prosemirror-view/style/prosemirror.css';

import { trackedTransaction } from 'wax-prosemirror-services';
import { WaxContext, useReactNodeViewPortals } from './WaxContext';
import transformPasted from './helpers/TransformPasted';
import { createReactNodeView } from './ReactNodeView';

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

  const editorRef = useRef();
  let view;
  const context = useContext(WaxContext);
  const { createPortal } = useReactNodeViewPortals();
  const handleCreatePortal = useCallback(createPortal, []);

  const setEditorRef = useCallback(
    node => {
      if (editorRef.current) {
        // this is where you do cleanup if you have to. the editorRef.current will
        // still point to the old ref, the old node. so you have some time here to
        // clean up the unmount if you need to.
      }
      if (node) {
        view = new EditorView(
          { mount: node },
          {
            editable: () => !readonly,
            state: EditorState.create(options),
            dispatchTransaction,
            user,
            scrollMargin: 200,
            scrollThreshold: 200,
            nodeViews: createNodeVies(),
            handleDOMEvents: {
              blur: onBlur
                ? view => {
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

  const createNodeVies = () => {
    const test = nodeViews.map((nodeView, key) => {
      return {
        multiple_choice(node, view, getPos, decorations) {
          console.log('rerenders for ever');
          return createReactNodeView({
            node,
            view,
            getPos,
            decorations,
            component: nodeView.multiple_choice.component,
            onCreatePortal: handleCreatePortal,
          });
        },
      };
    });
    console.log(test);
    return test[0];
  };

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

  const editor = <div ref={setEditorRef} />;

  return useMemo(
    () =>
      props.children({
        editor,
      }),
    [readonly],
  );
};
