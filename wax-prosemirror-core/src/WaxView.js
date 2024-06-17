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
import useWaxView from './useWaxView';

const EditorContainer = styled.div`
  height: 100%;
  position: relative;
`;

const WaxPortals = ComponentPlugin('waxPortals');
const WaxOverlays = ComponentPlugin('waxOverlays');

const WaxView = props => {
  const { autoFocus } = props;
  useWaxView(props);
  const {
    pmViews: { main },
    app,
  } = useContext(WaxContext);

  // useEffect(() => {
  //   return () => app.resetApp();
  // }, []);

  const editorRef = useCallback(
    element => {
      if (element && main) {
        element.replaceWith(main?.dom);
      }
    },
    [main],
  );

  useEffect(() => {
    if (autoFocus && main) {
      main.focus();
    }
  }, [autoFocus, main]);

  return (
    <EditorContainer>
      <div ref={editorRef} />
      <WaxOverlays activeViewId="main" group="main" />
      <WaxPortals />
    </EditorContainer>
  );
};

export default WaxView;
