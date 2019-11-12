import React from "react";
const ComponentPlugin = props => {
  const { state } = props;
  const pluginComponent = state.plugins.map(plugin => {
    if (state[plugin.key] && state[plugin.key].component) {
      const Component = state[plugin.key].component;
      return <Component {...props} />;
    }
    return null;
  });

  console.log(pluginComponent);
  return pluginComponent[11];
};

export default ComponentPlugin;
