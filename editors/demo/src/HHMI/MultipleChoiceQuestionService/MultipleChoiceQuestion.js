import React from 'react';
import { isEmpty } from 'lodash';
import { injectable } from 'inversify';
import { Tools } from 'wax-prosemirror-services';
import { Commands } from 'wax-prosemirror-utilities';
import { Fragment } from 'prosemirror-model';
import { v4 as uuidv4 } from 'uuid';
import helpers from './helpers/helpers';
import ToolBarBtn from './components/ToolBarBtn';

const checkifEmpty = view => {
  const { state } = view;
  const { from, to } = state.selection;
  state.doc.nodesBetween(from, to, (node, pos) => {
    if (node.textContent !== ' ') Commands.simulateKey(view, 13, 'Enter');
  });
};

const createQuestion = (state, dispatch, tr, context) => {
  const newAnswerId = uuidv4();
  const answerOption = state.config.schema.nodes.multiple_choice.create(
    { id: newAnswerId },
    Fragment.empty,
  );
  dispatch(tr.replaceSelectionWith(answerOption));
  setTimeout(() => {
    helpers.createEmptyParagraph(context, newAnswerId);
  }, 100);
};

@injectable()
class MultipleChoiceQuestion extends Tools {
  title = 'Add Multiple Choice Question';
  label = 'Multiple Choice';
  name = 'Multiple Choice';

  get run() {
    return (view, context) => {
      checkifEmpty(view);

      const { state, dispatch } = view;
      const { from, to } = state.selection;
      const { tr } = state;

      state.schema.nodes.question_wrapper.spec.atom = false;

      setTimeout(() => {
        state.doc.nodesBetween(from, to, (node, pos) => {
          if (node.type.name === 'question_wrapper') {
            createQuestion(state, dispatch, tr, context);
          } else {
            tr.setBlockType(
              from,
              to,
              state.config.schema.nodes.question_wrapper,
              {
                class: 'question',
              },
            );
            if (!tr.steps.length) return false;
            createQuestion(state, dispatch, tr, context);
          }
        });
        state.schema.nodes.question_wrapper.spec.atom = true;
      });
    };
  }

  get active() {
    return state => {};
  }

  select = (state, activeViewId) => {
    let status = true;
    const { from, to } = state.selection;
    state.doc.nodesBetween(from, to, (node, pos) => {
      if (node.type.name === 'question_wrapper') {
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
    return this._isDisplayed ? (
      <ToolBarBtn key={uuidv4()} item={this.toJSON()} view={view} />
    ) : null;
  }
}

export default MultipleChoiceQuestion;
