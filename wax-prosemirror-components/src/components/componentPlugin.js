import React from "react";
import WaxContext from "wax-prosemirror-core/src/helpers/WaxContext";

const ComponentPlugin = renderArea => props => (
  <WaxContext.Consumer>
    {context => {
      const { state = { plugins: [] } } = context.view;
      const pluginComponent = state.plugins.map(plugin => {
        if (
          state[plugin.key] &&
          state[plugin.key].renderArea === renderArea &&
          state[plugin.key].component
        ) {
          const Component = state[plugin.key].component;
          return <Component key={plugin.key} state={state} />;
        }

        return null;
      });

      return pluginComponent;
    }}
  </WaxContext.Consumer>
);

export default ComponentPlugin;
