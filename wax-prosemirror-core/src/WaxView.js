/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import React, {
  useContext,
  useCallback,
  useMemo,
  useEffect,
  forwardRef,
  useState,
  useImperativeHandle,
} from 'react';
import styled from 'styled-components';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import trackedTransaction from './utilities/track-changes/trackedTransaction';
import { WaxContext } from './WaxContext';
import { PortalContext } from './PortalContext';
import ComponentPlugin from './ComponentPlugin';
import WaxOptions from './WaxOptions';

import helpers from './helpers/helpers';
import './styles/styles.css';

const EditorContainer = styled.div`
  height: 100%;
  position: relative;
`;

const WaxPortals = ComponentPlugin('waxPortals');
const WaxOverlays = ComponentPlugin('waxOverlays');

let previousDoc;

const WaxView = forwardRef((props, ref) => {
  let view;
  const {
    browserSpellCheck,
    customValues,
    readonly,
    autoFocus,
    user,
    targetFormat,
    serializer,
    scrollMargin,
    scrollThreshold,
  } = props;

  const context = useContext(WaxContext);
  const { createPortal } = useContext(PortalContext);
  const [mounted, setMounted] = useState(false);

  context.app.setContext({ ...context, createPortal });
  const schema = context.app.getSchema();

  const setEditorRef = useCallback(
    node => {
      if (node) {
        // if (!mounted) {
        context.app.bootServices();
        context.app.getShortCuts();
        context.app.getRules();
        // }
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
            scrollMargin: scrollMargin || 200,
            scrollThreshold: scrollThreshold || 200,
            attributes: {
              spellcheck: browserSpellCheck ? 'true' : 'false',
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
        setTimeout(() => {
          if (autoFocus && view) {
            view.state.tr.insertText('', 0);
            view.dispatch(view.state.tr.scrollIntoView());
            view.focus();
          }
        }, 500);
      }
      return node;
    },
    [readonly, customValues, context.app.id],
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
        ? trackedTransaction(transaction, view.state, user, context)
        : transaction;

    if (!view) return;

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
    <EditorContainer>
      <div ref={setEditorRef} />
      <WaxOverlays activeViewId="main" group="main" />
      <WaxPortals />
    </EditorContainer>
  );

  return useMemo(
    () =>
      props.children({
        editor,
      }),
    [readonly, customValues, context.app.id],
  );
});

export default WaxView;
