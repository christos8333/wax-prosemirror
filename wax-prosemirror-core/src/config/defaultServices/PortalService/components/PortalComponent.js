import React, { useContext } from 'react';
import { PortalContext } from 'wax-prosemirror-core';
import ReactDOM from 'react-dom';
// import { isEmpty } from 'lodash';

export default () => {
  const { portals } = useContext(PortalContext);

  return (
    <>
      {portals.length > 0 &&
        portals.map(
          ({
            element,
            component: Component,
            id,
            decorations,
            node,
            view,
            getPos,
          }) => {
            return ReactDOM.createPortal(
              <Component
                decorations={decorations}
                getPos={getPos}
                key={id}
                node={node}
                view={view}
              />,
              element,
              id,
            );
          },
        )}
    </>
  );
};
