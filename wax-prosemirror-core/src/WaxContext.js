/* eslint react/prop-types: 0 */
/* eslint react/destructuring-assignment: 0 */
import React, { useContext, useState } from 'react';

export const WaxContext = React.createContext({
  pmViews: {},
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
    pmViews: props.view || {},
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
      delete context.pmViews[deletedView];
    },
    updateView: (newView, activeViewId) => {
      const pmViews = Object.assign(context.pmViews, newView);
      const activeView = pmViews[activeViewId || context.activeViewId];
      setContext({
        ...context,
        pmViews,
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

export class Service {
  setApp(app) {
    this.app = app;
  }

  get container() {
    return this.app.container;
  }

  get config() {
    return this.app.config.get(`config.${this.name}`) || this.app.config;
  }

  get schema() {
    return this.app.getSchema();
  }
}
