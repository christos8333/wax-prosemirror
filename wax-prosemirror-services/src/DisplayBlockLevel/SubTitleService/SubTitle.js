import React from 'react';
import { injectable } from 'inversify';
import { isEmpty } from 'lodash';
import { Tools, Commands, LeftSideButton } from 'wax-prosemirror-core';

@injectable()
export default class SubTitle extends Tools {
  title = 'Change to Subtitle';
  label = 'Subtitle';
  name = 'SubTitle';

  get run() {
    return (state, dispatch) => {
      Commands.setBlockType(state.config.schema.nodes.subtitle, {
        class: 'cst',
      })(state, dispatch);
    };
  }

  get active() {
    return state => {
      return Commands.blockActive(state.config.schema.nodes.subtitle)(state);
    };
  }

  select = (state, activeViewId) => {
    if (activeViewId !== 'main') return false;
    return true;
  };

  get enable() {
    return state => {
      return Commands.setBlockType(state.config.schema.nodes.subtitle)(state);
    };
  }

  renderTool(view) {
    if (isEmpty(view)) return null;
    return this.isDisplayed() ? (
      <LeftSideButton item={this.toJSON()} key="BlockQuote" view={view} />
    ) : null;
  }
}
