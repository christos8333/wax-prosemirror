import React from 'react';
import { injectable } from 'inversify';
import { isEmpty } from 'lodash';
import { Tools, Commands, LeftSideButton } from 'wax-prosemirror-core';

@injectable()
class ExtractPoetry extends Tools {
  title = 'Change to Extract Poetry';
  label = 'Extract Poetry';
  name = 'ExtractPoetry';

  get run() {
    return (state, dispatch) => {
      Commands.setBlockType(state.config.schema.nodes.extractPoetry, {
        class: 'extract-poetry',
      })(state, dispatch);
    };
  }

  select = (state, activeViewId) => {
    if (activeViewId !== 'main') return false;
    return true;
  };

  get active() {
    return state => {
      return Commands.blockActive(state.config.schema.nodes.extractPoetry)(
        state,
      );
    };
  }

  get enable() {
    return state => {
      return Commands.setBlockType(state.config.schema.nodes.extractPoetry)(
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
export default ExtractPoetry;
