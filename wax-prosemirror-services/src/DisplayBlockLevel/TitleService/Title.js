import React from 'react';
import { isEmpty } from 'lodash';
import { injectable } from 'inversify';
import { Commands, DocumentHelpers, Tools } from 'wax-prosemirror-core';
import TitleButton from './components/TitleButton';
import checkLevelFromConfig from '../HeadingService/checkLevelFromConfig';

@injectable()
export default class Title extends Tools {
  title = 'Change to Title';
  label = 'Title (H1)';
  name = 'Title';

  get run() {
    return (state, dispatch) => {
      Commands.setBlockType(state.config.schema.nodes.title, { level: 1 })(
        state,
        dispatch,
      );
    };
  }

  get active() {
    return state => {
      return Commands.blockActive(state.config.schema.nodes.title)(state);
    };
  }

  select = (state, activeViewId) => {
    const {
      selection: { $from, $to },
    } = state;

    if (this.config) {
      const allowedLevel = checkLevelFromConfig(
        state,
        activeViewId,
        this.config,
      );
      if (allowedLevel > 1) return false;
    }

    const titleCounter = DocumentHelpers.findChildrenByType(
      state.doc,
      state.config.schema.nodes.title,
      true,
    );

    if (
      activeViewId !== 'main' ||
      $from.parent !== $to.parent ||
      titleCounter.length === 1
    )
      return false;

    return true;
  };

  get enable() {
    return state => {
      return Commands.setBlockType(state.config.schema.nodes.title)(state);
    };
  }

  renderTool(view) {
    if (isEmpty(view)) return null;
    return this.isDisplayed() ? (
      <TitleButton item={this.toJSON()} key="Title" view={view} />
    ) : null;
  }
}
