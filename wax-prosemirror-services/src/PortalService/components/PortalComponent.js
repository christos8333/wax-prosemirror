import React, { useContext, useEffect, useState } from 'react';
import { PortalContext } from 'wax-prosemirror-core';
import ReactDOM from 'react-dom';
import { v4 as uuidv4 } from 'uuid';
import { isEmpty } from 'lodash';

export default () => {
  const { element, component, node, view, getPos, decorations } = useContext(
    PortalContext,
  );

  const [portals, setPortals] = useState([]);

  console.log(node, view, getPos(), decorations);
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
