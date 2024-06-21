import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
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
  const main = useWaxView(props);

  const divRef = useRef(null);

  const initializeWaxView = useCallback(() => {
    if (divRef.current) {
      divRef.current.replaceChildren(main?.dom);
    }
  }, [main]);

  useEffect(() => {
    initializeWaxView();
  }, [initializeWaxView]);

  return (
    <EditorContainer>
      <div ref={divRef} />
      <WaxOverlays activeViewId="main" group="main" />
      <WaxPortals />
    </EditorContainer>
  );
};

export default WaxView;
