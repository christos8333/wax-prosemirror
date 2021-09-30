import React, {
  useRef,
  useContext,
  useCallback,
  useMemo,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import applyDevTools from 'prosemirror-dev-tools';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { trackedTransaction } from 'wax-prosemirror-services';
import { WaxContext } from './WaxContext';
import { PortalContext } from './PortalContext';
import transformPasted from './helpers/TransformPasted';
import ComponentPlugin from './ComponentPlugin';
import WaxOptions from './WaxOptions';
import styles from './styles/styles';

const WaxPortals = ComponentPlugin('waxPortals');

let previousDoc;

const PMstyleWrapper = styled.span`
  ${styles};
`;

export default props => {
  const {
    browserSpellCheck,
    readonly,
    onBlur,
    debug,
    autoFocus,
    user,
    targetFormat,
  } = props;
  const editorRef = useRef();
  let view;
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
            disallowedTools: [],
            user,
            scrollMargin: 200,
            scrollThreshold: 200,
            handleDOMEvents: {
              blur: onBlur
                ? editorView => {
                    const serialize = props.serializer(schema);
                    onBlur(serialize(editorView.state.doc.content));
                  }
                : null,
            },
            transformPasted: slice => {
              return transformPasted(slice, view);
            },
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
        if (debug) applyDevTools(view);
        if (autoFocus)
          setTimeout(() => {
            if (view) view.focus();
          }, 1000);

        return () => view.destroy();
      }
      editorRef.current = node;
    },
    [readonly],
  );

  useEffect(() => {
    return () => (view = null);
  }, []);

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
    if (targetFormat === 'JSON') {
      if (view.state.doc !== previousDoc || tr.getMeta('forceUpdate'))
        props.onChange(state.doc.toJSON());
    } else {
      // eslint-disable-next-line no-lonely-if
      if (view.state.doc !== previousDoc || tr.getMeta('forceUpdate'))
        props.onChange(state.doc.content);
    }
  };

  const editor = (
    <PMstyleWrapper>
      <div ref={setEditorRef} />
      <WaxPortals />
    </PMstyleWrapper>
  );

  return useMemo(
    () =>
      props.children({
        editor,
      }),
    [readonly],
  );
};
