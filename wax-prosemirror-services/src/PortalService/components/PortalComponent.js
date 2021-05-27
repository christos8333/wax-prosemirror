import React, { useContext, useEffect, useState } from 'react';
import { PortalContext } from 'wax-prosemirror-core';
import ReactDOM from 'react-dom';
import { isEmpty } from 'lodash';

export default () => {
  const {
    element,
    component,
    node,
    view,
    getPos,
    decorations,
    id,
  } = useContext(PortalContext);

  const [portals, setPortals] = useState([]);

  useEffect(() => {
    if (!isEmpty(element)) {
      portals.push({ dom: element, component, active: true, id });
      setPortals([...portals]);
    }
  }, [element]);

  return (
    <>
      {portals.length > 0 &&
        // eslint-disable-next-line no-shadow
        portals.map(({ dom, component: Component, id }) => {
          return ReactDOM.createPortal(
            <Component
              key={id}
              decorations={decorations}
              getPos={getPos}
              node={node}
              view={view}
            />,
            dom,
            id,
          );
        })}
    </>
  );
};
