import React from 'react';
import { injectable } from 'inversify';
import { isEmpty } from 'lodash';
import { wrapIn } from 'prosemirror-commands';
import { NodeSelection, TextSelection } from 'prosemirror-state';
import { LeftSideButton } from 'wax-prosemirror-components';
import { Tools } from 'wax-prosemirror-core';
import { findWrapping } from 'prosemirror-transform';

@injectable()
class BlockQuote extends Tools {
  title = 'Change to Block Quote';
  label = 'Block Quote';
  name = 'BlockQuote';

  get run() {
    return (state, dispatch) => {
      const selectionFrom = new TextSelection(state.doc.resolve(0));
      const selectionTo = new TextSelection(
        state.doc.resolve(state.doc.content.size),
      );

      const range = selectionFrom.$from.blockRange(selectionTo.$to);
      const wrapping =
        range && findWrapping(range, state.config.schema.nodes.blockquote, {});

      dispatch(state.tr.wrap(range, wrapping).scrollIntoView());
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
