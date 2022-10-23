import React from 'react';
import { isEmpty } from 'lodash';
import { undo } from 'prosemirror-history';
import { injectable } from 'inversify';
import { UndoRedoButton } from 'wax-prosemirror-components';
import { Tools } from 'wax-prosemirror-core';

@injectable()
export default class Undo extends Tools {
  title = 'Undo';
  icon = 'undo';
  name = 'Undo';

  get run() {
    return (state, dispatch) => {
      undo(state, tr => dispatch(tr.setMeta('inputType', 'Undo')));
    };
  }

  get enable() {
    return undo;
  }

  select(state) {
    return undo(state);
  }

  renderTool(view) {
    if (isEmpty(view)) return null;
    // eslint-disable-next-line no-underscore-dangle
    return this._isDisplayed ? (
      <UndoRedoButton item={this.toJSON()} key="Undo" view={view} />
    ) : null;
  }
}
