import React, { useContext, useState } from 'react';

export const WaxContext = React.createContext({
  view: {},
  activeView: {},
  activeViewId: null,
  app: null,
  updateView: null,
  updateActiveView: null,
});

export default props => {
  const [context, setContext] = useState({
    app: props.app,
    view: props.view || {},
    activeView: props.activeView || {},
    activeViewId: props.activeViewId || {},
    updateView: (newView, activeViewId) => {
      const view = Object.assign(context.view, newView);
      const activeView = view[activeViewId || context.activeViewId];
      setContext({
        ...context,
        view,
        activeView: activeView,
        activeViewId: activeViewId || context.activeViewId,
      });
    },
  });

  return (
    <WaxContext.Provider
      value={{
        ...context,
      }}
    >
      {props.children}
    </WaxContext.Provider>
  );
};

export const useInjection = identifier => {
  const {
    app: { container },
  } = useContext(WaxContext);

  if (!container) {
    throw new Error();
  }

  return container.isBound(identifier)
    ? { instance: container.get(identifier) }
    : null;
};
