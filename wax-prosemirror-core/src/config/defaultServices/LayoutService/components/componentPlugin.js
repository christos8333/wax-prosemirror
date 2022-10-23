/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { useInjection } from '../../../../WaxContext';

// eslint-disable-next-line no-unused-vars
class UpdateView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: this.props.view,
    };
  }

  updateView(view) {
    this.setState(view);
  }

  render() {
    return this.props.children({ view: this.state.view });
  }
}

const ComponentPlugin = renderArea => layoutProps => {
  const { instance } = useInjection('Layout');

  const components = instance.render(renderArea);

  return components
    ? components.map(({ component: Component, componentProps }, key) => {
        return (
          <Component
            key={`${renderArea}-${key}`}
            {...layoutProps}
            {...componentProps}
          />
        );
      })
    : null;
};
export default ComponentPlugin;
