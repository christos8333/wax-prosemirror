import React from "react";
import { useInjection } from "../../ioc-react";

const ComponentPlugin = renderArea => props => {
  const Layout = useInjection("Layout");
  const Components = Layout.render(renderArea);

  return Components.map(Component => <Component renderArea={renderArea} />);
};
export default ComponentPlugin;
