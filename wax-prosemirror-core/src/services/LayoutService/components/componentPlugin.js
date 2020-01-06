import React, { Component } from "react";
import { useInjection } from "../../../ioc-react";
class UpdateView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: this.props.view
    };
  }

  updateView(view) {
    this.setState(view);
  }

  render() {
    return this.props.children({ view: this.state.view });
  }
}

const ComponentPlugin = renderArea => props => {
  const { view, instance } = useInjection("Layout");

  const components = instance.render(renderArea);

  return components
    ? components.map((Component, key) => {
        return <Component {...view} key={`${renderArea}-${key}`} />;
      })
    : null;
};
export default ComponentPlugin;
