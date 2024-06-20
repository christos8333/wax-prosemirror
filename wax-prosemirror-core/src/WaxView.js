/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import React, { useContext, useCallback, useEffect, useRef } from 'react';
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
  const { autoFocus } = props;

  const main = useWaxView(props);

  // const {
  //   pmViews: { main },
  // } = useContext(WaxContext);

  useEffect(() => {
    if (autoFocus && main) {
      main.focus();
    }
  }, [autoFocus]);

  const divRef = useRef(null);

  const initialize = useCallback(() => {
    console.log('Initializing only once');

    // You can perform any initialization logic here
    // This code will only run once when the component mounts
    if (divRef.current) {
      console.log('dkddkkdk', main?.dom);
      divRef.current.replaceChildren(main?.dom);
      // Perform some operation with divRef.current
    }
  }, [main]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <EditorContainer>
      <div ref={divRef} />
      <WaxOverlays activeViewId="main" group="main" />
      <WaxPortals />
    </EditorContainer>
  );
};

export default WaxView;
