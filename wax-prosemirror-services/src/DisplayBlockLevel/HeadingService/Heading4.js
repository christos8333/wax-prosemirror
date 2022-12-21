import React from 'react';
import { injectable } from 'inversify';
import { isEmpty } from 'lodash';
import { Tools, Commands, LeftSideButton } from 'wax-prosemirror-core';
import checkLevelFromConfig from './checkLevelFromConfig';

@injectable()
export default class Heading4 extends Tools {
  title = 'Change to heading level 4';
  label = 'Heading 4';
  name = 'Heading4';

  get run() {
    return (state, dispatch) => {
      Commands.setBlockType(state.config.schema.nodes.heading4)(
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
      state.doc.nodesBetween(from, to, node => {
        if (node.type.name === 'heading4') {
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
      if (allowedLevel > 4) return false;
    }

    return true;
  };

  get enable() {
    return state => {
      return Commands.setBlockType(state.config.schema.nodes.heading4)(state);
    };
  }

  renderTool(view) {
    if (isEmpty(view)) return null;
    return this.isDisplayed() ? (
      <LeftSideButton item={this.toJSON()} key="Heading4" view={view} />
    ) : null;
  }
}
