import React from 'react';
import { isEmpty } from 'lodash';
import { injectable } from 'inversify';
import { TitleButton } from 'wax-prosemirror-components';
import { Commands, DocumentHelpers } from 'wax-prosemirror-utilities';
import Tools from '../../lib/Tools';

export default
@injectable()
class Title extends Tools {
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
    // eslint-disable-next-line no-underscore-dangle
    return this._isDisplayed ? (
      <TitleButton key="Title" item={this.toJSON()} view={view} />
    ) : null;
  }
}
