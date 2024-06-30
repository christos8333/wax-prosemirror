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
  state: null,
  updateActiveView: null,
  removeView: null,
});

export default props => {
  const [context, setContext] = useState({
    state: props.state,
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
          setContext(prevContext => {
            const updatedPmViews = { ...prevContext.pmViews, ...newView };
            const newActiveViewId = activeViewId || prevContext.activeViewId;
            return {
              ...prevContext,
              pmViews: updatedPmViews,
              activeView: updatedPmViews[newActiveViewId],
              activeViewId: newActiveViewId,
            };
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
  const context = useContext(ApplicationContext);

  if (!context.app.container) {
    throw new Error();
  }

  return context.app.container.isBound(identifier)
    ? { instance: context.app.container.get(identifier) }
    : null;
};
