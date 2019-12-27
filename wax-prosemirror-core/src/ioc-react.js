import React, { useContext, useState } from "react";

export const WaxContext = React.createContext({
  view: null,
  app: null,
  updateView: null
});

// export default class WaxContextComponent extends Component {
//   constructor(props) {
//     super(props);
//     console.log("tesss");
//     this.state = {
//       app: props.app,
//       view: props.view,
//       updateView: view => {
//         this.setState(view);
//       }
//     };
//   }

//   componentWillReceiveProps(next, prev) {
//     console.log(next, prev);
//   }

//   render() {
//     console.log("provider");
//     return (
//       <WaxContext.Provider
//         value={{
//           app: this.state.app,
//           view: this.state.view,
//           updateView: this.state.updateView
//         }}
//       >
//         {this.props.children}
//       </WaxContext.Provider>
//     );
//   }
// }

export default props => {
  const [context, setContext] = useState({
    app: props.app,
    view: props.view,
    updateView: view => {
      setContext({ ...context, view: view });
    }
  });

  return (
    <WaxContext.Provider
      value={{
        ...context
      }}
    >
      {props.children}
    </WaxContext.Provider>
  );
};

export const useInjection = identifier => {
  const {
    app: { container },
    view
  } = useContext(WaxContext);

  if (!container) {
    throw new Error();
  }

  return container.isBound(identifier)
    ? { view, instance: container.get(identifier) }
    : null;
};
