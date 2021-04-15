/* eslint react/prop-types: 0 */
/* eslint react/destructuring-assignment: 0 */
import React, { useState } from 'react';

export const PortalContext = React.createContext({
  createPortal: () => {},
  portals: {},
});

export default props => {
  const [portal, setPortal] = useState({
    element: {},
    component: {},
    node: {},
    view: {},
    getPos: () => {},
    decorations: [],
    createPortal: (element, component, node, view, getPos, decorations) => {
      setPortal({
        ...portal,
        element,
        component,
        node,
        view,
        getPos,
        decorations,
      });
    },
  });

  return (
    <PortalContext.Provider
      value={{
        ...portal,
      }}
    >
      {props.children}
    </PortalContext.Provider>
  );
};
