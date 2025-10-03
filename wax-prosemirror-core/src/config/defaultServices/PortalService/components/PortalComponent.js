import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { PortalContext } from '../../../../PortalContext';

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
            context,
          }) => {
            return ReactDOM.createPortal(
              <Component
                decorations={decorations}
                getPos={getPos}
                key={id}
                node={node}
                view={view}
                context={context}
              />,
              element,
              id,
            );
          },
        )}
    </>
  );
};
