/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import { Overlay } from 'wax-prosemirror-components';
import usePosition from './usePosition';

export default (Component, markType) => props => {
  const [position, setPosition, mark] = usePosition(markType);
  const component = useMemo(
    () => (
      <Component
        mark={mark}
        position={position}
        setPosition={setPosition}
        {...props}
      />
    ),
    [JSON.stringify(mark), position],
  );
  const visible = !!position.left;

  return <Overlay position={position}>{visible && component}</Overlay>;
};
