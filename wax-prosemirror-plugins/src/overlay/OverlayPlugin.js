import React from "react";
import { Plugin, PluginKey } from "prosemirror-state";
import { Overlay } from "wax-prosemirror-components";
import { Wax } from "wax-prosemirror-core";

const OverlayPlugin = args => {
  const { renderArea = "editorOverlays" } = args;
  const OverlayKey = new PluginKey("overlay");

  return new Plugin({
    key: OverlayKey,
    state: {
      init() {
        return {
          renderArea,
          component: props => {
            return <Overlay {...props}>1111</Overlay>;
          }
        };
      },
      apply(tr, oldState, newState) {
        return this.getState(newState);
      }
    }
  });
};

export default OverlayPlugin;


reactComponent 

overlayPlugin position 

linkPlugin showhide


linkPlugin = createplugin (reactComponent, overlay)



const createPlugin = (reactComponent, overlayPlugin) => {

  return new Plugin ({
     key,
     state,
     view,
  })
}

createPlugin = () => class {
  name: "test",
  renderArea,
  component: () => {},
  itemsMenus: [],
  plugins: [plugin, plugin]
}



class createPlugin {
  constructor() {
    this.name
    this.plugins.push(overlayPlugin(Component, showCommand))
  }
  plugins () { return []}
}


class waxPlugin {
  constructor() {
    this.name 
    
  }

  createPlugin () {
    
  }
}

class linkPlugin extends waxPlugin {
  component:
  renderArea:
  showCommand:
  itemsMenus:
  
}

new(OverlayPlugin)