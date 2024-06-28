/* eslint react/prop-types: 0 */
/* eslint react/destructuring-assignment: 0 */
import React, { useState } from 'react';

export const StateContext = React.createContext({
  state: null,
});

export default props => {
  const [context, setContext] = useState({
    state: props.state,
  });

  return (
    <StateContext.Provider
      value={{
        ...context,
        updateState: state => {
          setContext({
            ...context,
            state,
          });
        },
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
};
