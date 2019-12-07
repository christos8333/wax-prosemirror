import React, { useContext } from "react";

const WaxContext = React.createContext({ view: null, app: null });

export default props => (
  <WaxContext.Provider value={{ app: props.app, view: props.view }}>
    {props.children}
  </WaxContext.Provider>
);

export function useInjection(identifier) {
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
}
