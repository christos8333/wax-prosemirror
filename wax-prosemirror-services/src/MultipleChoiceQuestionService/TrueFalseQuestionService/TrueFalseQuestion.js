import React from 'react';
import { isEmpty } from 'lodash';
import { injectable } from 'inversify';
import { Commands } from 'wax-prosemirror-utilities';
import { v4 as uuidv4 } from 'uuid';
import { Fragment } from 'prosemirror-model';
import { TextSelection } from 'prosemirror-state';
import { wrapIn } from 'prosemirror-commands';
import ToolBarBtn from '../components/ToolBarBtn';
import helpers from '../helpers/helpers';
import Tools from '../../lib/Tools';

@injectable()
class MultipleChoiceQuestion extends Tools {
  title = 'Add True False Question';
  icon = 'multipleChoice';
  name = 'TrueFalse';
  label = 'True False';

  get run() {
    return (view, context) => {
      helpers.createOptions(
        view,
        context,
        view.state.config.schema.nodes.true_false,
        view.state.config.schema.nodes.true_false_container,
      );
    };
  }

  get active() {
    return state => {
      return Commands.isParentOfType(
        state,
        state.config.schema.nodes.true_false,
      );
    };
  }

  select = (state, activeView) => {
    const { disallowedTools } = activeView.props;
    if (disallowedTools.includes('MultipleChoice')) return false;
    let status = true;
    const { from, to } = state.selection;

    if (from === null) return false;

    state.doc.nodesBetween(from, to, (node, pos) => {
      if (node.type.groups.includes('questions')) {
        status = false;
      }
    });
    return status;
  };

  get enable() {
    return state => {};
  }

  renderTool(view) {
    if (isEmpty(view)) return null;
    // eslint-disable-next-line no-underscore-dangle
    return this._isDisplayed ? (
      <ToolBarBtn item={this.toJSON()} key={uuidv4()} view={view} />
    ) : null;
  }
}

export default MultipleChoiceQuestion;
