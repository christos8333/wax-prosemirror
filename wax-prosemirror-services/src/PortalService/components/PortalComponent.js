import React, { useContext, useEffect, useState } from 'react';
import { PortalContext } from 'wax-prosemirror-core';
import ReactDOM from 'react-dom';
import { v4 as uuidv4 } from 'uuid';
import { isEmpty } from 'lodash';
import TestComponent from './TestComponent';

export default () => {
  const { element, component } = useContext(PortalContext);

  const [portals, setPortals] = useState([]);

  useEffect(() => {
    if (!isEmpty(element)) {
      portals.push({ dom: element, component, active: true });
      setPortals([...portals]);
    }
  }, [element]);

  return (
    <>
      {portals.length > 0 &&
        portals.map(({ dom, component: Component }) => {
          return ReactDOM.createPortal(<Component />, dom, uuidv4());
        })}
    </>
  );
};
