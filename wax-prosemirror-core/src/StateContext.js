/* eslint react/prop-types: 0 */
/* eslint react/destructuring-assignment: 0 */
import React, { useState } from 'react';

export const StateContext = React.createContext({
  state: null,
});

export default ({ state, children }) => {
  const [context, setContext] = useState(state);

  return (
    <StateContext.Provider
      value={{
        ...context,
        updateState: st => {
          setContext({
            ...context,
            state: st,
          });
        },
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
