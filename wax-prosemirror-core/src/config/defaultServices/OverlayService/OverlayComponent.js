/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo, useContext } from 'react';
import { Overlay } from 'wax-prosemirror-components';
import { WaxContext } from '../../../WaxContext';
import usePosition from './usePosition';

export default (Component, markType) => props => {
  const context = useContext(WaxContext);
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
    [JSON.stringify(mark), position, context.activeViewId],
  );
  const visible = !!position.left;

  return (
    <Overlay position={position}>
      {props.activeViewId === context.activeViewId && visible && component}
    </Overlay>
  );
};
