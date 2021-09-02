import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { isEmpty } from 'lodash';
import { injectable } from 'inversify';
import { ImageUpload } from 'wax-prosemirror-components';
import { Commands } from 'wax-prosemirror-utilities';
import Tools from '../lib/Tools';
import fileUpload from './fileUpload';

export default
@injectable()
class Image extends Tools {
  title = 'Insert image';
  icon = 'image';
  name = 'Image';

  get run() {
    return true;
  }

  select = activeView => {
    const { disallowedTools } = activeView.props;
    if (disallowedTools.includes('images')) return false;
    return true;
  };

  get enable() {
    return state => {
      return Commands.canInsert(state.config.schema.nodes.image)(state);
    };
  }

  renderTool(view) {
    if (isEmpty(view)) return null;
    const upload = fileUpload(
      view,
      this.config.get('fileUpload'),
      this.pmplugins.get('imagePlaceHolder'),
    );
    return this._isDisplayed ? (
      <ImageUpload
        key={uuidv4()}
        item={this.toJSON()}
        fileUpload={upload}
        view={view}
      />
    ) : null;
  }
}
