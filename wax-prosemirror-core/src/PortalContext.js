/* eslint react/prop-types: 0 */
/* eslint react/destructuring-assignment: 0 */
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

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
    id: null,
    getPos: () => {},
    decorations: [],
    createPortal: (element, component, node, view, getPos, decorations) => {
      setPortal({
        ...portal,
        id: uuidv4(),
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
