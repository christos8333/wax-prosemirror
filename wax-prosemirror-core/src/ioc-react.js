import React, { useContext, useState } from "react";

export const WaxContext = React.createContext({
  view: {},
  app: null,
  updateView: null
});

export default props => {
  const [context, setContext] = useState({
    app: props.app,
    view: props.view || {},
    updateView: view => {
      console.log(view, context);
      setContext({ ...context, view: Object.assign(context.view, view) });
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
    app: { container }
  } = useContext(WaxContext);

  if (!container) {
    throw new Error();
  }

  return container.isBound(identifier)
    ? { instance: container.get(identifier) }
    : null;
};
