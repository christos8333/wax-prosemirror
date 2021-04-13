import React, { useContext } from 'react';
import { PortalContext } from 'wax-prosemirror-core';
import ReactDOM from 'react-dom';
import { v4 as uuidv4 } from 'uuid';
import TestComponent from './TestComponent';

export default () => {
  const { portals } = useContext(PortalContext);

  console.log(portals);
  return (
    <>
      {portals.length > 0
        ? ReactDOM.createPortal(
            <TestComponent />,
            document.getElementById('portalId'),
            uuidv4(),
          )
        : null}
    </>
  );
};
