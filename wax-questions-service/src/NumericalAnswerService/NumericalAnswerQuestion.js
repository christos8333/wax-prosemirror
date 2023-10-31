import { injectable } from 'inversify';
import { findWrapping } from 'prosemirror-transform';
import { v4 as uuidv4 } from 'uuid';
import { Commands, Tools } from 'wax-prosemirror-core';
import helpers from '../MultipleChoiceQuestionService/helpers/helpers';

@injectable()
class NumericalAnswerQuestion extends Tools {
  title = 'Numerical Answer Question';
  icon = '';
  name = 'Numerical Answer';

  get run() {
    return main => {};
  }

  get active() {
    return state => {
      if (
        Commands.isParentOfType(
          state,
          state.config.schema.nodes.numerical_answer_container,
        )
      ) {
        return true;
      }
      return false;
    };
  }

  select = (state, activeViewId, activeView) => {};
}

export default NumericalAnswerQuestion;
