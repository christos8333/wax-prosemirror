import React from "react";
import { useInjection } from "../../../ioc-react";
import { v4 as uuid } from "uuid";

const ComponentPlugin = renderArea => props => {
  const { view, instance } = useInjection("Layout");

  const components = instance.render(renderArea);

  return components
    ? components.map(Component => {
        return <Component view={view} key={uuid()} />;
      })
    : null;
};
export default ComponentPlugin;
