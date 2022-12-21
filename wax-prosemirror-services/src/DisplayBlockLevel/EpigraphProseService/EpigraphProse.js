import React from 'react';
import { injectable } from 'inversify';
import { isEmpty } from 'lodash';
import { Tools, Commands, LeftSideButton } from 'wax-prosemirror-core';

@injectable()
export default class EpigraphProse extends Tools {
  title = 'Change to Epigraph Prose';
  label = 'Epigraph Prose';
  name = 'EpigraphProse';

  get run() {
    return (state, dispatch) => {
      Commands.setBlockType(state.config.schema.nodes.epigraphProse, {
        class: 'epigraph-prose',
      })(state, dispatch);
    };
  }

  get active() {
    return state => {
      return Commands.blockActive(state.config.schema.nodes.epigraphProse)(
        state,
      );
    };
  }

  select = (state, activeViewId) => {
    if (activeViewId !== 'main') return false;
    return true;
  };

  get enable() {
    return state => {
      return Commands.setBlockType(state.config.schema.nodes.epigraphProse)(
        state,
      );
    };
  }

  renderTool(view) {
    if (isEmpty(view)) return null;
    return this.isDisplayed() ? (
      <LeftSideButton item={this.toJSON()} key="epigraphProse" view={view} />
    ) : null;
  }
}
