import React from 'react';
import { isEmpty } from 'lodash';
import { injectable } from 'inversify';
import { Tools } from 'wax-prosemirror-services';
import { Commands } from 'wax-prosemirror-utilities';
import { Fragment } from 'prosemirror-model';
import { v4 as uuidv4 } from 'uuid';
import ToolBarBtn from './components/ToolBarBtn';

const checkifEmpty = view => {
  const { state } = view;
  const { from, to } = state.selection;
  state.doc.nodesBetween(from, to, (node, pos) => {
    if (node.textContent !== ' ') Commands.simulateKey(view, 13, 'Enter');
  });
};

const createQuestion = (state, dispatch, tr) => {
  const { empty, $from, $to } = state.selection;
  let content = Fragment.empty;
  if (!empty && $from.sameParent($to) && $from.parent.inlineContent)
    content = $from.parent.content.cut($from.parentOffset, $to.parentOffset);

  const answerOption = state.config.schema.nodes.multiple_choice.create(
    { id: uuidv4() },
    content,
  );
  dispatch(tr.replaceSelectionWith(answerOption));
};

@injectable()
class MultipleChoiceQuestion extends Tools {
  title = 'Add Multiple Choice Question';
  label = 'Multiple Choice';
  name = 'Multiple Choice';

  get run() {
    return view => {
      checkifEmpty(view);

      const { state, dispatch } = view;
      const { from, to } = state.selection;
      const { tr } = state;

      state.schema.nodes.question_wrapper.spec.atom = false;

      setTimeout(() => {
        state.doc.nodesBetween(from, to, (node, pos) => {
          if (node.type.name === 'question_wrapper') {
            createQuestion(state, dispatch, tr);
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
            createQuestion(state, dispatch, tr);
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
    return true;
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
