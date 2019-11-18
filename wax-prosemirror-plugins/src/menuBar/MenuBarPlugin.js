import React from "react";
import { Plugin, PluginKey } from "prosemirror-state";

const MenuBarPlugin = ({ renderArea, menuItems, Component }) => {
  const MenuBarKey = new PluginKey(renderArea);
  return new Plugin({
    key: MenuBarKey,
    state: {
      init() {
        return {
          renderArea,
          component: props => {
            return <Component menuItems={menuItems} {...props} />;
          }
        };
      },
      apply(tr, oldState, newState) {
        return this.getState(newState);
      }
    }
  });
};

export default MenuBarPlugin;
