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

const checkifEmpty = view => {
  const { state } = view;
  const { from, to } = state.selection;
  state.doc.nodesBetween(from, to, (node, pos) => {
    if (node.textContent !== ' ') Commands.simulateKey(view, 13, 'Enter');
  });
};

const createOption = (main, context) => {
  const { state, dispatch } = main;
  /* Create Wrapping */
  const { $from, $to } = state.selection;
  const range = $from.blockRange($to);

  wrapIn(state.config.schema.nodes.true_false_container, {
    id: uuidv4(),
  })(state, dispatch);

  /* set New Selection */
  dispatch(
    main.state.tr.setSelection(
      new TextSelection(main.state.tr.doc.resolve(range.$to.pos)),
    ),
  );

  /* create First Option */
  const firstOption = main.state.config.schema.nodes.true_false.create(
    { id: uuidv4() },
    Fragment.empty,
  );
  dispatch(main.state.tr.replaceSelectionWith(firstOption));
  setTimeout(() => {
    helpers.createEmptyParagraph(context, firstOption.attrs.id);
  }, 50);

  /* create Second Option */
  const secondOption = main.state.config.schema.nodes.true_false.create(
    { id: uuidv4() },
    Fragment.empty,
  );
  dispatch(main.state.tr.replaceSelectionWith(secondOption));
  setTimeout(() => {
    helpers.createEmptyParagraph(context, secondOption.attrs.id);
  }, 50);
};

@injectable()
class MultipleChoiceQuestion extends Tools {
  title = 'Add True False Question';
  icon = 'multipleChoice';
  name = 'TrueFalse';
  label = 'True False';

  get run() {
    return (view, context) => {
      checkifEmpty(view);
      createOption(view, context);
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
