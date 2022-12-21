import React from 'react';
import { injectable } from 'inversify';
import { isEmpty } from 'lodash';
import { Tools, Commands, LeftSideButton } from 'wax-prosemirror-core';

@injectable()
class ExtractProse extends Tools {
  title = 'Change to Extract Prose';
  label = 'Extract Prose';
  name = 'ExtractProse';

  get run() {
    return (state, dispatch) => {
      Commands.setBlockType(state.config.schema.nodes.extractProse, {
        class: 'extract-prose',
      })(state, dispatch);
    };
  }

  get active() {
    return state => {
      return Commands.blockActive(state.config.schema.nodes.extractProse)(
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
      return Commands.setBlockType(state.config.schema.nodes.extractProse)(
        state,
      );
    };
  }

  renderTool(view) {
    if (isEmpty(view)) return null;
    return this.isDisplayed() ? (
      <LeftSideButton item={this.toJSON()} key="BlockQuote" view={view} />
    ) : null;
  }
}
export default ExtractProse;
