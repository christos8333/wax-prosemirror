import React from 'react';
import { injectable } from 'inversify';
import { isEmpty } from 'lodash';
import { LeftSideButton } from 'wax-prosemirror-components';
import { Commands } from 'wax-prosemirror-utilities';
import { Tools } from 'wax-prosemirror-core';

@injectable()
class EpigraphPoetry extends Tools {
  title = 'Change to Epigraph Poetry';
  label = 'Epigraph Poetry';
  name = 'EpigraphPoetry';

  get run() {
    return (state, dispatch) => {
      Commands.setBlockType(state.config.schema.nodes.epigraphPoetry, {
        class: 'epigraph-poetry',
      })(state, dispatch);
    };
  }

  get active() {
    return state => {
      return Commands.blockActive(state.config.schema.nodes.epigraphPoetry)(
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
      return Commands.setBlockType(state.config.schema.nodes.epigraphPoetry)(
        state,
      );
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

export default EpigraphPoetry;
