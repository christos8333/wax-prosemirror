/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useImperativeHandle } from 'react';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import trackedTransaction from './utilities/track-changes/trackedTransaction';
import { WaxContext } from './WaxContext';
import { PortalContext } from './PortalContext';
import WaxOptions from './WaxOptions';
import helpers from './helpers/helpers';
import './styles/styles.css';

let previousDoc;

const useWaxView = props => {
  const {
    browserSpellCheck,
    customValues,
    readonly,
    autoFocus,
    user,
    innerViewRef,
    targetFormat,
    serializer,
    scrollMargin,
    scrollThreshold,
  } = props;

  let view;

  const context = useContext(WaxContext);
  const { createPortal } = useContext(PortalContext);

  context.app.setContext({ ...context, createPortal });
  const schema = context.app.getSchema();

  useEffect(() => {
    context.app.bootServices();
    context.app.getShortCuts();
    context.app.getRules();

    const options = WaxOptions({
      ...props,
      schema,
      plugins: context.app.getPlugins(),
    });

    view = new EditorView(null, {
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
    });

    context.updateView(
      {
        main: view,
      },
      'main',
    );
    setTimeout(() => {
      if (autoFocus && view) {
        view.focus();
      }
    }, 500);
  }, [readonly, customValues, context.app.id]);

  useEffect(() => {
    return () => (view = null);
  }, []);

  useImperativeHandle(innerViewRef, () => ({
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
};

export default useWaxView;
