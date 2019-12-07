import React from "react";
import { useInjection } from "../../../ioc-react";

const ComponentPlugin = renderArea => props => {
  const { view, instance } = useInjection("Layout");

  const components = instance.render(renderArea);

  return components
    ? components.map(Component => {
        return <Component view={view} />;
      })
    : null;
};
export default ComponentPlugin;
