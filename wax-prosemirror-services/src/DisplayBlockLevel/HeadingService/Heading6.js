import React from 'react';
import { injectable } from 'inversify';
import { isEmpty } from 'lodash';
import { LeftSideButton } from 'wax-prosemirror-components';
import { Commands } from 'wax-prosemirror-utilities';
import { Tools } from 'wax-prosemirror-core';

@injectable()
export default class Heading2 extends Tools {
  title = 'Change to heading level 6';
  label = 'Heading 6';
  name = 'Heading6';

  get run() {
    return (state, dispatch) => {
      Commands.setBlockType(state.config.schema.nodes.heading6)(
        state,
        dispatch,
      );
    };
  }

  get active() {
    return (state, activeViewId) => {
      let isActive = false;
      if (activeViewId !== 'main') return false;

      const { from, to } = state.selection;
      state.doc.nodesBetween(from, to, (node, pos) => {
        if (node.type.name === 'heading6') {
          isActive = true;
        }
      });
      return isActive;
    };
  }

  select = (state, activeViewId) => {
    if (activeViewId !== 'main') return false;
    return true;
  };

  get enable() {
    return state => {
      return Commands.setBlockType(state.config.schema.nodes.heading6)(state);
    };
  }

  renderTool(view) {
    if (isEmpty(view)) return null;
    // eslint-disable-next-line no-underscore-dangle
    return this._isDisplayed ? (
      <LeftSideButton item={this.toJSON()} key="Heading5" view={view} />
    ) : null;
  }
}
