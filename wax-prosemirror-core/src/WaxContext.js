/* eslint react/prop-types: 0 */
/* eslint react/destructuring-assignment: 0 */
import React, { useContext, useState } from 'react';

export const WaxContext = React.createContext({
  view: {},
  activeView: {},
  activeViewId: null,
  app: null,
  updateView: null,
  updateActiveView: null,
  removeView: null,
});

export default props => {
  const [context, setContext] = useState({
    app: props.app,
    view: props.view || {},
    activeView: props.activeView || {},
    activeViewId: props.activeViewId || {},
    options: { fullScreen: false },
    transaction: {},
    setTransaction: tr => {
      Object.assign(context.transaction, tr);
    },
    setOption: option => {
      Object.assign(context.options, option);
    },
    removeView: deletedView => {
      delete context.view[deletedView];
    },
    updateView: (newView, activeViewId) => {
      const view = Object.assign(context.view, newView);
      const activeView = view[activeViewId || context.activeViewId];
      setContext({
        ...context,
        view,
        activeView,
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
