import React from 'react';
import { isEmpty } from 'lodash';
import { injectable } from 'inversify';
import { v4 as uuidv4 } from 'uuid';
import { Fragment } from 'prosemirror-model';
import { TextSelection } from 'prosemirror-state';
import { findWrapping } from 'prosemirror-transform';
import { Commands, Tools } from 'wax-prosemirror-core';
import helpers from '../MultipleChoiceQuestionService/helpers/helpers';
import ToolBarBtn from './components/ToolBarBtn';

const createEmptyParagraph = (context, newAnswerId) => {
  const { pmViews } = context;

  if (pmViews[newAnswerId]) {
    pmViews[newAnswerId].dispatch(
      pmViews[newAnswerId].state.tr.setSelection(
        TextSelection.between(
          pmViews[newAnswerId].state.selection.$anchor,
          pmViews[newAnswerId].state.selection.$head,
        ),
      ),
    );
    if (pmViews[newAnswerId].dispatch) {
      const type = pmViews.main.state.schema.nodes.paragraph;
      pmViews[newAnswerId].dispatch(
        pmViews[newAnswerId].state.tr
          .insert(0, type.create())
          .setMeta('exludeToHistoryFromOutside', true),
      );
    }
    pmViews[newAnswerId].dispatch(
      pmViews[newAnswerId].state.tr.setSelection(
        TextSelection.between(
          pmViews[newAnswerId].state.selection.$head,
          pmViews[newAnswerId].state.selection.$head,
        ),
      ),
    );
    pmViews[newAnswerId].focus();
  }
};

@injectable()
class EssayQuestion extends Tools {
  title = 'Add Essay Question';
  icon = 'essay';
  name = 'Essay';
  label = '';

  get run() {
    return (main, context) => {
      helpers.checkifEmpty(main);
      const { state, dispatch } = main;
      /* Create Wrapping */
      const { $from, $to } = state.selection;
      const range = $from.blockRange($to);
      const { tr } = state;

      const wrapping =
        range &&
        findWrapping(range, state.config.schema.nodes.essay_container, {
          id: uuidv4(),
        });
      if (!wrapping) return false;
      tr.wrap(range, wrapping);

      const map = tr.mapping.maps[0];
      let newPos = 0;
      map.forEach((_from, _to, _newFrom, newTo) => {
        newPos = newTo;
      });

      tr.setSelection(TextSelection.create(tr.doc, range.$to.pos));

      const essayQuestion = state.config.schema.nodes.essay_question.create(
        { id: uuidv4() },
        Fragment.empty,
      );
      const essayPrompt = state.config.schema.nodes.essay_prompt.create(
        { id: uuidv4() },
        Fragment.empty,
      );

      const essayAnswer = state.config.schema.nodes.essay_answer.create(
        { id: uuidv4() },
        Fragment.empty,
      );

      tr.replaceSelectionWith(essayQuestion);
      tr.setSelection(TextSelection.create(tr.doc, newPos));
      tr.replaceSelectionWith(essayPrompt);
      tr.setSelection(TextSelection.create(tr.doc, newPos + 1));
      tr.replaceSelectionWith(essayAnswer);
      dispatch(tr);

      setTimeout(() => {
        createEmptyParagraph(context, essayAnswer.attrs.id);
        createEmptyParagraph(context, essayPrompt.attrs.id);
        createEmptyParagraph(context, essayQuestion.attrs.id);
      }, 150);
    };
  }

  get active() {
    return state => {
      if (
        Commands.isParentOfType(
          state,
          state.config.schema.nodes.essay_container,
        )
      ) {
        return true;
      }
      return false;
    };
  }

  select = (state, activeView) => {
    let status = true;
    const { from, to } = state.selection;

    const { disallowedTools } = activeView.props;
    if (from === null || disallowedTools.includes('Essay')) status = false;

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

export default EssayQuestion;
