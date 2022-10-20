import React from 'react';
import { injectable } from 'inversify';
import { isEmpty } from 'lodash';
import { wrapIn } from 'prosemirror-commands';
import { NodeSelection } from 'prosemirror-state';
import { LeftSideButton } from 'wax-prosemirror-components';
import { Tools } from 'wax-prosemirror-core';

@injectable()
class BlockQuote extends Tools {
  title = 'Change to Block Quote';
  label = 'Block Quote';
  name = 'BlockQuote';

  get run() {
    return (state, dispatch) => {
      wrapIn(state.config.schema.nodes.blockquote)(state, dispatch);
    };
  }

  select = (state, activeViewId) => {
    if (activeViewId !== 'main') return false;
    return true;
  };

  get active() {
    return state => {
      const { $from, to } = state.selection;
      const same = $from.sharedDepth(to);
      if (same === 0) return false;
      const pos = $from.before(same);
      const node = NodeSelection.create(state.doc, pos);
      if (node.$from.parent.hasMarkup(state.config.schema.nodes.blockquote)) {
        return true;
      }
      return false;
    };
  }

  get enable() {
    return state => {
      return wrapIn(state.config.schema.nodes.blockquote)(state);
    };
  }

  renderTool(view) {
    if (isEmpty(view)) return null;
    // eslint-disable-next-line no-underscore-dangle
    return this._isDisplayed ? (
      <LeftSideButton item={this.toJSON()} key="BlockQuote" view={view} />
    ) : null;
  }
}
export default BlockQuote;
