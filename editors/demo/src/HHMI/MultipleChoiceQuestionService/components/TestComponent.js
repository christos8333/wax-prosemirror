/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useState,
} from 'react';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { StepMap } from 'prosemirror-transform';
import styled from 'styled-components';

const styles = {
  border: '1px solid black',
};

const EditorWrapper = styled.div`
  pointer-events: visible;
  user-select: all;
`;


export default ({ node, view, getPos }) => {
  const [showExplanation, setShowExplanation] = useState(false);
 }
  // }

  const clickMe = () => {
    setShowExplanation(true);
    showExp = true;
    // view.dispatch(view.state.tr);
  };

;
  return (
    <>
      <button onClick={clickMe}>Show Explanation</button>
      {showExplanation && (
        <input type="text" placeholder="type your explanation"></input>
      )}
    </>
  );
};
