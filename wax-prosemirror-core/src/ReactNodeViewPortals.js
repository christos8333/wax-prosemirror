import React, { useContext, useReducer, useState } from 'react';

const initialState = { portal: null };
const ReactNodeViewPortalsContext = React.createContext({
  createPortal: () => {},
  state: {},
});
const ReactNodeViewPortalsProvider = ({ children }) => {
  //   const [data, dispatch] = useReducer(reducer, initialState);
  const [data, addPortal] = useState(initialState);

  const { portal: Portal } = data;

  return (
    <ReactNodeViewPortalsContext.Provider
      value={{
        createPortal: portal => {
          addPortal({ key: portal.key, portal });
          //   return dispatch({ type: 'createPortal', key: portal.key, portal });
        },
        state: data,
      }}
    >
      {children}
      {Portal}
    </ReactNodeViewPortalsContext.Provider>
  );
};

function reducer(state, action) {
  switch (action.type) {
    case 'createPortal':
      return {
        ...state,
        [action.key]: {
          portal: action.portal,
        },
      };
    default:
      return state;
  }
}

export const useReactNodeViewPortals = () =>
  useContext(ReactNodeViewPortalsContext);
export default ReactNodeViewPortalsProvider;
