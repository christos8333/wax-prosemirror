import { useContext, useEffect, useImperativeHandle, useState } from 'react';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import trackedTransaction from './utilities/track-changes/trackedTransaction';
import { WaxContext } from './WaxContext';
import { PortalContext } from './PortalContext';
import WaxOptions from './WaxOptions';
import helpers from './helpers/helpers';
import './styles/styles.css';

let previousDoc;
let currentCofingHash;

const useWaxView = props => {
  const {
    browserSpellCheck,
    customValues,
    readonly,
    autoFocus,
    user,
    innerViewRef,
    configHash,
    targetFormat,
    serializer,
    scrollMargin,
    scrollThreshold,
    onChange,
  } = props;

  const context = useContext(WaxContext);
  const [WaxView, setWaxView] = useState(null);

  const { createPortal } = useContext(PortalContext);

  context.app.setContext({ ...context, createPortal });
  const schema = context.app.getSchema();
  let view;

  useEffect(() => {
    context.app.bootServices();
    context.app.getShortCuts();
    context.app.getRules();

    const options = WaxOptions({
      ...props,
      schema,
      plugins: context.app.getPlugins(),
    });

    console.log('in view');
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

    setWaxView(view);
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
    if (currentCofingHash === configHash) {
      const { TrackChange } = props;
      const tr =
        TrackChange && TrackChange.enabled
          ? trackedTransaction(transaction, view.state, user, context)
          : transaction;

      if (!view) return;

      previousDoc = view.state.doc;
      const state = view.state.apply(tr);
      view.updateState(state);

      context.setTransaction(transaction);

      context.updateView(
        {
          main: view,
        },
        'main',
      );

      const docContent =
        targetFormat === 'JSON' ? state.doc.toJSON() : state.doc.content;
      if (!previousDoc.eq(view.state.doc) || tr.getMeta('forceUpdate'))
        onChange(docContent);
    }
    setTimeout(() => {
      currentCofingHash = configHash;
    }, 100);
  };

  return WaxView;
};

export default useWaxView;
