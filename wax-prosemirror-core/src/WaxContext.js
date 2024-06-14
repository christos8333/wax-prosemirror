/* eslint react/prop-types: 0 */
/* eslint react/destructuring-assignment: 0 */
import React, { useContext, useEffect, useState } from 'react';

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

  useEffect(() => {
    if (context.app.id !== props.app.id) {
      console.log('waxContent, useeffect');
      setContext({
        ...context,
        app: props.app,
      });
    }
  }, [props.app.id]);

  return (
    <WaxContext.Provider value={context}>{props.children}</WaxContext.Provider>
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
