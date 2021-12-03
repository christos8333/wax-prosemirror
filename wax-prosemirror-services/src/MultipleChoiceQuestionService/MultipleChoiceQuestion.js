import React from 'react';
import { isEmpty } from 'lodash';
import { injectable } from 'inversify';
import { Commands } from 'wax-prosemirror-utilities';
import { v4 as uuidv4 } from 'uuid';
import { Fragment } from 'prosemirror-model';
import { TextSelection } from 'prosemirror-state';
import { wrapIn } from 'prosemirror-commands';
import helpers from './helpers/helpers';
import Tools from '../lib/Tools';
import ToolBarBtn from './components/ToolBarBtn';

const createOption = (main, context) => {
  const { state, dispatch } = main;
  /* Create Wrapping */
  const { $from, $to } = state.selection;
  const range = $from.blockRange($to);

  wrapIn(state.config.schema.nodes.multiple_choice_container, {
    id: uuidv4(),
  })(state, dispatch);

  /* set New Selection */
  dispatch(
    main.state.tr.setSelection(
      new TextSelection(main.state.tr.doc.resolve(range.$to.pos)),
    ),
  );

  /* create First Option */
  const firstOption = main.state.config.schema.nodes.multiple_choice.create(
    { id: uuidv4() },
    Fragment.empty,
  );
  dispatch(main.state.tr.replaceSelectionWith(firstOption));

  /* create Second Option */
  const secondOption = main.state.config.schema.nodes.multiple_choice.create(
    { id: uuidv4() },
    Fragment.empty,
  );
  dispatch(main.state.tr.replaceSelectionWith(secondOption));

  setTimeout(() => {
    helpers.createEmptyParagraph(context, secondOption.attrs.id);
    helpers.createEmptyParagraph(context, firstOption.attrs.id);
  }, 50);
};

@injectable()
class MultipleChoiceQuestion extends Tools {
  title = 'Add Multiple Choice Question';
  icon = 'multipleChoice';
  name = 'Multiple Choice';
  label = 'Multiple Choice';

  get run() {
    return (view, context) => {
      helpers.checkifEmpty(view);
      createOption(view, context);
    };
  }

  get active() {
    return state => {
      return Commands.isParentOfType(
        state,
        state.config.schema.nodes.multiple_choice,
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
