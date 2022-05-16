import React from 'react';
import { isEmpty } from 'lodash';
import { injectable } from 'inversify';
import { v4 as uuidv4 } from 'uuid';
import { Commands } from 'wax-prosemirror-utilities';
import { Fragment } from 'prosemirror-model';
import { TextSelection } from 'prosemirror-state';
import { findWrapping } from 'prosemirror-transform';
import ToolBarBtn from './components/ToolBarBtn';
import Tools from '../lib/Tools';

const checkifEmpty = view => {
  const { state } = view;
  const { from, to } = state.selection;
  state.doc.nodesBetween(from, to, (node, pos) => {
    if (node.textContent !== ' ') Commands.simulateKey(view, 13, 'Enter');
  });
  if (state.selection.constructor.name === 'GapCursor') {
    Commands.simulateKey(view, 13, 'Enter');
    setTimeout(() => {
      view.focus();
    });
  }
};

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
        pmViews[newAnswerId].state.tr.insert(0, type.create()),
      );
    }
    pmViews[newAnswerId].dispatch(
      pmViews[newAnswerId].state.tr.setSelection(
        TextSelection.between(
          pmViews[newAnswerId].state.selection.$anchor,
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
      checkifEmpty(main);
      const { state, dispatch } = main;
      /* Create Wrapping */
      const { $from, $to } = state.selection;
      const range = $from.blockRange($to);
      const { tr } = main.state;

      const wrapping =
        range &&
        findWrapping(range, main.state.config.schema.nodes.essay_container, {
          id: uuidv4(),
        });
      if (!wrapping) return false;
      tr.wrap(range, wrapping);

      // const map = tr.mapping.maps[0];
      // let newPos = 0;
      // map.forEach((_from, _to, _newFrom, newTo) => {
      //   newPos = newTo;
      // });

      tr.setSelection(TextSelection.create(tr.doc, range.$to.pos));

      const essayQuestion = main.state.config.schema.nodes.essay_question.create(
        { id: uuidv4() },
        Fragment.empty,
      );
      const essayAnswer = main.state.config.schema.nodes.essay_answer.create(
        { id: uuidv4() },
        Fragment.empty,
      );

      tr.replaceSelectionWith(essayQuestion);
      tr.replaceSelectionWith(essayAnswer);
      dispatch(tr);

      setTimeout(() => {
        createEmptyParagraph(context, essayAnswer.attrs.id);
        createEmptyParagraph(context, essayQuestion.attrs.id);
      }, 50);
    };
  }

  get active() {
    return state => {};
  }

  select = (state, activeView) => {
    let status = true;
    const { from, to } = state.selection;

    const { disallowedTools } = activeView.props;
    if (from === null || disallowedTools.includes('Essay')) status = false;

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

export default EssayQuestion;
