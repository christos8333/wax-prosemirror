import React from 'react';
import { isEmpty } from 'lodash';
import { injectable } from 'inversify';
import { EditorShortCutsTool } from 'wax-prosemirror-components';
import { Tools } from 'wax-prosemirror-core';

@injectable()
class ShortCutsInfoTool extends Tools {
  title = 'ShortCuts Info';
  name = 'ShortCutsInfo';

  get run() {
    return () => true;
  }

  get enable() {
    return state => {
      return true;
    };
  }

  renderTool(view) {
    if (isEmpty(view)) return null;
    // eslint-disable-next-line no-underscore-dangle
    return this._isDisplayed ? (
      <EditorShortCutsTool
        item={this.toJSON()}
        key="ShortCutsInfo"
        view={view}
      />
    ) : null;
  }
}

export default ShortCutsInfoTool;
