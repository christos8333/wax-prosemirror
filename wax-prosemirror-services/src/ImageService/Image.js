/* eslint-disable no-underscore-dangle */
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { isEmpty } from 'lodash';
import { injectable } from 'inversify';
import { ImageUpload } from 'wax-prosemirror-components';
import { Commands, Tools } from 'wax-prosemirror-core';
import fileUpload from './fileUpload';

@injectable()
export default class Image extends Tools {
  title = 'Insert image';
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
    if (isEmpty(view)) return null;
    const upload = fileUpload(
      view,
      this.config.get('fileUpload'),
      this.pmplugins.get('imagePlaceHolder'),
    );
    return this._isDisplayed ? (
      <ImageUpload
        fileUpload={upload}
        item={this.toJSON()}
        key={uuidv4()}
        view={view}
      />
    ) : null;
  }
}
