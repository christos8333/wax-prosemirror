import React, { useContext } from "react";

const WaxContext = React.createContext({ view: null, container: null });

export default props => (
  <WaxContext.Provider value={{ container: props.container, view: props.view }}>
    {props.children}
  </WaxContext.Provider>
);

export function useInjection(identifier) {
  const { container } = useContext(WaxContext);

  if (!container) {
    throw new Error();
  }

  return container.isBound(identifier) ? container.get(identifier) : null;
}
