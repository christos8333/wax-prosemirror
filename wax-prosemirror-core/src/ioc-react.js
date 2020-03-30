import React, { useContext, useState } from "react";

export const WaxContext = React.createContext({
  view: {},
  app: null,
  updateView: null,
  updateActiveView: null
});

export default props => {
  const [context, setContext] = useState({
    app: props.app,
    view: props.view || {},
    activeView: props.activeView || {},
    updateView: view => {
      setContext({ ...context, view: Object.assign(context.view, view) });
    },
    updateActiveView: view => {
      setContext({ ...context, activeView: view });
    }
  });

  return (
    <WaxContext.Provider
      value={{
        ...context
      }}
    >
      {props.children}
    </WaxContext.Provider>
  );
};

export const useInjection = identifier => {
  const { app: { container } } = useContext(WaxContext);

  if (!container) {
    throw new Error();
  }

  return container.isBound(identifier)
    ? { instance: container.get(identifier) }
    : null;
};
