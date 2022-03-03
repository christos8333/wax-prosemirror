/* eslint-disable react/prop-types */
import React, {
  useRef,
  useContext,
  useCallback,
  useMemo,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';

import applyDevTools from 'prosemirror-dev-tools';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { trackedTransaction } from 'wax-prosemirror-services';
import { WaxContext } from './WaxContext';
import { PortalContext } from './PortalContext';
import ComponentPlugin from './ComponentPlugin';
import WaxOptions from './WaxOptions';
import helpers from './helpers/helpers';
import './styles/styles.css';

const WaxPortals = ComponentPlugin('waxPortals');
const WaxOverlays = ComponentPlugin('waxOverlays');

let previousDoc;

const WaxView = forwardRef((props, ref) => {
  let view;
  const {
    browserSpellCheck,
    customValues,
    readonly,
    debug,
    autoFocus,
    user,
    targetFormat,
    serializer,
  } = props;

  const WaxEditorRef = useRef();
  const [mounted, setMounted] = useState(false);
  const context = useContext(WaxContext);
  const { createPortal } = useContext(PortalContext);

  context.app.setContext({ ...context, createPortal });

  const schema = context.app.getSchema();

  if (!mounted) {
    context.app.bootServices();
  }

  const setEditorRef = useCallback(
    // eslint-disable-next-line consistent-return
    node => {
      if (WaxEditorRef.current) {
        // this is where you do cleanup if you have to. the WaxEditorRef.current will
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
            customValues,
            state: EditorState.create(options),
            dispatchTransaction,
            disallowedTools: [],
            user,
            scrollMargin: 200,
            scrollThreshold: 200,
            attributes: {
              spellcheck: browserSpellCheck ? 'true' : 'false',
            },
            handleDOMEvents: {
              blur: (editorView, event) => {
                if (view && event.relatedTarget === null) {
                  view.focus();
                }
              },
            },
          },
        );

        setMounted(true);

        context.updateView(
          {
            main: view,
          },
          'main',
        );
        if (debug) applyDevTools(view);
        if (autoFocus)
          setTimeout(() => {
            if (view) view.focus();
          }, 1000);

        return () => view.destroy();
      }
      WaxEditorRef.current = node;
    },
    [readonly, customValues],
  );

  useEffect(() => {
    return () => (view = null);
  }, []);

  useImperativeHandle(ref, () => ({
    getContent() {
      return helpers.getDocContent(schema, serializer, targetFormat, context);
    },
  }));

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
    context.setTransaction(transaction);

    if (!transaction.getMeta('outsideView')) {
      context.updateView(
        {
          main: view,
        },
        'main',
      );
    }

    const docContent =
      targetFormat === 'JSON' ? state.doc.toJSON() : state.doc.content;

    if (!previousDoc.eq(view.state.doc) || tr.getMeta('forceUpdate'))
      props.onChange(docContent);
  };

  const editor = (
    <>
      <div ref={setEditorRef} />
      {context.activeViewId === 'main' && <WaxOverlays group="main" />}
      <WaxPortals />
    </>
  );

  return useMemo(
    () =>
      props.children({
        editor,
      }),
    [readonly, customValues, context.activeViewId],
  );
});

export default WaxView;
