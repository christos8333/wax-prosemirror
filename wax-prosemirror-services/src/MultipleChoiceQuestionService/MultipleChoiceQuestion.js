import React from 'react';
import { isEmpty } from 'lodash';
import { injectable } from 'inversify';
import { v4 as uuidv4 } from 'uuid';
import { Commands, Tools } from 'wax-prosemirror-core';
import helpers from './helpers/helpers';
import ToolBarBtn from './components/ToolBarBtn';

@injectable()
class MultipleChoiceQuestion extends Tools {
  title = 'Add Multiple Choice Question';
  icon = 'multipleChoice';
  name = 'Multiple choice';
  label = 'Multiple choice';

  get run() {
    return (view, context) => {
      helpers.createOptions(
        view,
        context,
        view.state.config.schema.nodes.multiple_choice_container,
        view.state.config.schema.nodes.question_node_multiple,
        view.state.config.schema.nodes.multiple_choice,
      );
    };
  }

  get active() {
    return state => {
      if (
        Commands.isParentOfType(
          state,
          state.config.schema.nodes.multiple_choice,
        ) ||
        Commands.isParentOfType(
          state,
          state.config.schema.nodes.question_node_multiple,
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

export default MultipleChoiceQuestion;
