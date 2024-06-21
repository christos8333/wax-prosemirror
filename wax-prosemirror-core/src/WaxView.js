/* eslint-disable consistent-return */
import React, { useCallback } from 'react';
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

  const waxRef = useCallback(
    node => {
      if (node) {
        node.replaceChildren(main?.dom);
        return node;
      }
    },
    [main],
  );

  return (
    <EditorContainer>
      <div ref={waxRef} />
      <WaxOverlays activeViewId="main" group="main" />
      <WaxPortals />
    </EditorContainer>
  );
};

export default WaxView;
