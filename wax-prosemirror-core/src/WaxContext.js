/* eslint react/prop-types: 0 */
/* eslint react/destructuring-assignment: 0 */
import React, { useContext, useEffect, useState } from 'react';

export const WaxContext = React.createContext({
  pmViews: {},
  activeView: {},
  activeViewId: null,
  app: null,
  updateView: null,
  updateState: null,
  state: null,
  updateActiveView: null,
  removeView: null,
});

export default props => {
  const [context, setContext] = useState({
    app: props.app,
    state: props.state,
    pmViews: props.view || {},
    activeView: props.activeView || {},
    activeViewId: props.activeViewId || {},
    options: { fullScreen: false },
    transaction: {},
  });

  useEffect(() => {
    if (context.app.id !== props.app.id) {
      setContext({
        ...context,
        app: props.app,
      });
    }
  }, [props.app.id]);

  return (
    <WaxContext.Provider
      value={{
        ...context,
        updateState: state => {
          setContext({
            ...context,
            state,
          });
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
        setTransaction: tr => {
          Object.assign(context.transaction, tr);
        },
        setOption: option => {
          Object.assign(context.options, option);
        },
        removeView: deletedView => {
          delete context.pmViews[deletedView];
        },
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
