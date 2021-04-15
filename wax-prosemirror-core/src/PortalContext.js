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
    createPortal: (element, component) => {
      setPortal({
        ...portal,
        element,
        component,
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
