import React from 'react';
import { isEmpty } from 'lodash';
import { injectable } from 'inversify';
import { v4 as uuidv4 } from 'uuid';
import { Commands, Tools } from 'wax-prosemirror-core';
import ToolBarBtn from '../components/ToolBarBtn';
import helpers from '../helpers/helpers';

@injectable()
class TrueFalseQuestion extends Tools {
  title = 'Add True False Question';
  icon = 'multipleChoice';
  name = 'TrueFalse';
  label = 'True False';

  get run() {
    return (view, context) => {
      helpers.createOptions(
        view,
        context,
        view.state.config.schema.nodes.true_false_container,
        view.state.config.schema.nodes.question_node_true_false,
        view.state.config.schema.nodes.true_false,
      );
    };
  }

  get active() {
    return state => {
      if (
        Commands.isParentOfType(
          state,
          state.config.schema.nodes.true_false_container,
        ) ||
        Commands.isParentOfType(state, state.config.schema.nodes.true_false) ||
        Commands.isParentOfType(
          state,
          state.config.schema.nodes.question_node_true_false,
        )
      ) {
        return true;
      }
      return false;
    };
  }

  select = (state, activeView) => {
    const { disallowedTools } = activeView.props;
    if (disallowedTools.includes('MultipleChoice')) return false;
    let status = true;
    const { from, to } = state.selection;

    if (from === null) return false;

    state.doc.nodesBetween(from, to, node => {
      if (node.type.groups.includes('questions')) {
        status = false;
      }
    });
    return status;
  };

  renderTool(view) {
    if (isEmpty(view)) return null;
    return this.isDisplayed() ? (
      <ToolBarBtn item={this.toJSON()} key={uuidv4()} view={view} />
    ) : null;
  }
}

export default TrueFalseQuestion;
