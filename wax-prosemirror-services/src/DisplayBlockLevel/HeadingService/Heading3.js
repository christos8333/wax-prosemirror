import React from 'react';
import { injectable } from 'inversify';
import { isEmpty } from 'lodash';
import { LeftSideButton } from 'wax-prosemirror-components';
import { Commands } from 'wax-prosemirror-utilities';
import { Tools } from 'wax-prosemirror-core';
import checkLevelFromConfig from './checkLevelFromConfig';

@injectable()
export default class Heading3 extends Tools {
  title = 'Change to heading level 3';
  label = 'Heading 3';
  name = 'Heading3';

  get run() {
    return (state, dispatch) => {
      Commands.setBlockType(state.config.schema.nodes.heading3)(
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
        if (node.type.name === 'heading3') {
          isActive = true;
        }
      });
      return isActive;
    };
  }

  select = (state, activeViewId) => {
    if (activeViewId !== 'main') return false;
    if (this.config) {
      const allowedLevel = checkLevelFromConfig(
        state,
        activeViewId,
        this.config,
      );
      if (allowedLevel > 3) return false;
    }

    return true;
  };

  get enable() {
    return state => {
      return Commands.setBlockType(state.config.schema.nodes.heading3)(state);
    };
  }

  renderTool(view) {
    if (isEmpty(view)) return null;
    // eslint-disable-next-line no-underscore-dangle
    return this._isDisplayed ? (
      <LeftSideButton item={this.toJSON()} key="Heading3" view={view} />
    ) : null;
  }
}
