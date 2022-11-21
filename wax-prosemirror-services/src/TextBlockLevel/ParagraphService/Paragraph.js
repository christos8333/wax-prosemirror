import React from 'react';
import { injectable } from 'inversify';
import { isEmpty } from 'lodash';
import { Tools, Commands, LeftSideButton } from 'wax-prosemirror-core';

@injectable()
export default class Paragraph extends Tools {
  title = 'Change to Paragraph';
  label = 'Paragraph';
  name = 'Paragraph';

  get run() {
    return (state, dispatch) => {
      Commands.setBlockType(state.config.schema.nodes.paragraph, {
        class: 'paragraph',
      })(state, dispatch);
    };
  }

  get active() {
    return state => {
      return Commands.blockActive(state.config.schema.nodes.paragraph)(state);
    };
  }

  select = (state, activeViewId) => {
    if (activeViewId !== 'main') return false;
    return true;
  };

  get enable() {
    return state => {
      return Commands.setBlockType(state.config.schema.nodes.paragraph)(state);
    };
  }

  renderTool(view) {
    if (isEmpty(view)) return null;
    return this.isDisplayed() ? (
      <LeftSideButton item={this.toJSON()} key="BlockQuote" view={view} />
    ) : null;
  }
}
