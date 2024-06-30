/* eslint-disable import/no-named-as-default */
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

const useWaxView = props => {
  const {
    browserSpellCheck,
    customValues,
    readonly,
    user,
    app,
    autoFocus,
    innerViewRef,
    targetFormat,
    serializer,
    scrollMargin,
    scrollThreshold,
    onChange,
  } = props;

  let view;

  const context = useContext(WaxContext);
  const [WaxView, setWaxView] = useState(null);

  const { createPortal } = useContext(PortalContext);

  app.setContext({ ...context, createPortal });
  const schema = app.getSchema();

  useEffect(() => {
    app.bootServices();
    app.getShortCuts();
    app.getRules();

    const options = WaxOptions({
      ...props,
      schema,
      plugins: app.getPlugins(),
    });

    view = new EditorView(null, {
      editable: () => !readonly,
      customValues,
      state: EditorState.create(options),
      disallowedTools: [],
      user,
      scrollMargin: scrollMargin || 200,
      scrollThreshold: scrollThreshold || 200,
      attributes: {
        spellcheck: browserSpellCheck ? 'true' : 'false',
      },
    });

    view.setProps({
      dispatchTransaction: transaction => {
        const { TrackChange } = props;
        const tr =
          TrackChange && TrackChange.enabled
            ? trackedTransaction(transaction, view.state, user, app)
            : transaction;

        previousDoc = view.state.doc;
        const state = view.state.apply(tr);
        view.updateState(state);

        context.setTransaction(transaction);
        if (!transaction.getMeta('outsideView')) {
          context.updateView({}, 'main');
        }

        const docContent =
          targetFormat === 'JSON' ? state.doc.toJSON() : state.doc.content;
        if (!previousDoc.eq(view.state.doc) || tr.getMeta('forceUpdate'))
          onChange(docContent);
      },
    });

    setWaxView({ ...view });

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
  }, [readonly, customValues, app.id]);

  useEffect(() => {
    return () => (view = null);
  }, []);

  useImperativeHandle(innerViewRef, () => ({
    getContent() {
      return helpers.getDocContent(schema, serializer, targetFormat, context);
    },
  }));

  return WaxView;
};

export default useWaxView;
