/* eslint react/prop-types: 0 */
/* eslint react/destructuring-assignment: 0 */
import React, { useContext, useState } from 'react';
// eslint-disable-next-line import/no-named-as-default
import ApplicationContext from './ApplicationContext';

export const WaxContext = React.createContext({
  pmViews: {},
  activeView: {},
  activeViewId: null,
  updateView: null,
  updateState: null,
  updateActiveView: null,
  removeView: null,
});

export default props => {
  const [context, setContext] = useState({
    pmViews: props.view || {},
    activeView: props.activeView || {},
    activeViewId: props.activeViewId || {},
    options: { fullScreen: false },
    transaction: {},
  });

  return (
    <WaxContext.Provider
      value={{
        ...context,
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
          setContext({
            ...context,
            options: { ...context.options, ...option },
          });
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
  const context = useContext(ApplicationContext);

  if (!context.app.container) {
    throw new Error();
  }

  return context.app.container.isBound(identifier)
    ? { instance: context.app.container.get(identifier) }
    : null;
};
