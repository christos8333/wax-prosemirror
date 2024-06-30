/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
import React, { useContext } from 'react';
// import { useInjection } from './WaxContext';
// eslint-disable-next-line import/no-named-as-default
import { ApplicationContext } from './ApplicationContext';

const ComponentPlugin = renderArea => layoutProps => {
  const { app } = useContext(ApplicationContext);

  const inject = app?.container.isBound('Layout')
    ? { instance: app?.container.get('Layout') }
    : null;

  const components = inject ? inject.instance.render(renderArea) : [];

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
