/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useInjection } from './WaxContext';

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
