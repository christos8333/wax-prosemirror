import React from "react";
import { useInjection } from "./ioc-react";

const ComponentPlugin = renderArea => props => {
  const Layout = useInjection("Layout");
  console.log(Layout);
  const { Component } = Layout.render(renderArea);

  return Component ? <Component renderArea={renderArea} /> : null;
  return Component.map(Component =>
    Component.renderArea === renderArea ? (
      <Component.component renderArea={renderArea} />
    ) : null
  );
};
export default ComponentPlugin;
