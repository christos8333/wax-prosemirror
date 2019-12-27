import React, { useContext, useState } from "react";

export const WaxContext = React.createContext({
  view: null,
  app: null,
  updateView: null
});

export default props => {
  const [context, setContext] = useState({
    app: props.app,
    view: props.view,
    updateView: view => {
      setContext({ ...context, view: view });
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
  const {
    app: { container },
    view
  } = useContext(WaxContext);

  if (!container) {
    throw new Error();
  }

  return container.isBound(identifier)
    ? { view, instance: container.get(identifier) }
    : null;
};
