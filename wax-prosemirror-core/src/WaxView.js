/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import React, { useContext, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { WaxContext } from './WaxContext';
import ComponentPlugin from './ComponentPlugin';
import './styles/styles.css';
import useWaxView from './useWaxView';

const EditorContainer = styled.div`
  height: 100%;
  position: relative;

  > div:first-child {
    height: 100%;
  }
`;

const WaxPortals = ComponentPlugin('waxPortals');
const WaxOverlays = ComponentPlugin('waxOverlays');

const WaxView = props => {
  const { autoFocus, configHash } = props;
  console.log(configHash);
  const main = useWaxView(props);
  console.log(main);
  // const {
  //   pmViews: { main },
  // } = useContext(WaxContext);

  const editorRef = useCallback(
    element => {
      console.log('WAXXXX');
      if (element && main) {
        element.replaceChildren(main?.dom);
      }

      // return () => element.remove();
    },
    [main],
  );

  useEffect(() => {
    if (autoFocus && main) {
      main.focus();
    }
  }, [autoFocus]);

  return (
    <EditorContainer>
      <div ref={editorRef} />
      <WaxOverlays activeViewId="main" group="main" />
      <WaxPortals />
    </EditorContainer>
  );
};

export default WaxView;
