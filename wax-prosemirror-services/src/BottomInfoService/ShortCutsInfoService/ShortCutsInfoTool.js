import React from 'react';
import { isEmpty } from 'lodash';
import { injectable } from 'inversify';
import { EditorShortCutsTool } from 'wax-prosemirror-components';
// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import Tools from '../../lib/Tools';

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
