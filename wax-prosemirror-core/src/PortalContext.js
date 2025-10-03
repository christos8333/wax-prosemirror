/* eslint react/prop-types: 0 */
/* eslint react/destructuring-assignment: 0 */
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const PortalContext = React.createContext({
  createPortal: () => {},
  portals: {},
  citationFormat: 'simple',
  setCitationFormat: () => {},
});

export default props => {
  const [citationFormat, setCitationFormat] = useState('simple');
  
  const [portal, setPortal] = useState({
    createPortal: (
      element,
      component,
      node,
      view,
      getPos,
      decorations,
      context,
    ) => {
      setTimeout(() => {
        portal.portals.push({
          id: uuidv4(),
          element,
          component,
          node,
          view,
          getPos,
          decorations,
          context,
        });
        setPortal({
          createPortal: portal.createPortal,
          portals: [...portal.portals],
        });
      });
    },
    portals: [],
  });

  return (
    <PortalContext.Provider
      value={{
        ...portal,
        citationFormat,
        setCitationFormat,
      }}
    >
      {props.children}
    </PortalContext.Provider>
  );
};
