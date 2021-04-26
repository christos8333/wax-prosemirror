/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';

import styled from 'styled-components';

export default ({ node, view, getPos }) => {
  const [showExplanation, setShowExplanation] = useState(false);

  const clickMe = () => {
    setShowExplanation(true);
    // view.dispatch(view.state.tr);
  };

  return (
    <>
      <button onClick={clickMe}>Show Explanation</button>
      {showExplanation && (
        <input type="text" placeholder="type your explanation"></input>
      )}
    </>
  );
};
