import React from 'react';
import { isEmpty } from 'lodash';
import { redo } from 'prosemirror-history';
import { injectable } from 'inversify';
import { Tools } from 'wax-prosemirror-core';
import UndoRedoButton from '../components/UndoRedoButton';

@injectable()
export default class Redo extends Tools {
  title = 'Redo';
  icon = 'redo';
  name = 'Redo';

  get run() {
    return (state, dispatch) => {
      redo(state, tr => dispatch(tr.setMeta('inputType', 'Redo')));
    };
  }

  get enable() {
    return redo;
  }

  select(state) {
    return redo(state);
  }

  renderTool(view) {
    if (isEmpty(view)) return null;
    return this.isDisplayed() ? (
      <UndoRedoButton item={this.toJSON()} key="Redo" view={view} />
    ) : null;
  }
}
