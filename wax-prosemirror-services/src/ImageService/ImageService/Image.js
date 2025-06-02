import React from 'react';
import { injectable } from 'inversify';
import { Commands, Tools } from 'wax-prosemirror-core';
import { v4 as uuidv4 } from 'uuid';

import ImageUploadComponent from './components/ImageUploadComponent';

@injectable()
export default class Image extends Tools {
  title = 'Upload Image';
  icon = 'image';
  name = 'Image';

  get run() {
    return true;
  }

  select = activeView => {
    const {
      selection: { from },
    } = activeView.state;
    if (from === null) return false;
    const { disallowedTools } = activeView.props;
    if (disallowedTools.includes('Images')) return false;
    return true;
  };

  get enable() {
    return state => {
      return Commands.canInsert(state.config.schema.nodes.image)(state);
    };
  }

  renderTool(view) {
    return (
      <ImageUploadComponent
        config={this.config}
        displayed={this.isDisplayed()}
        item={this}
        key={uuidv4()}
        pmplugins={this.pmplugins}
        view={view}
      />
    );
  }
}
