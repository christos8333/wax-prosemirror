import { injectable } from 'inversify';
import { Tools } from 'wax-prosemirror-services';
import {Commands} from 'wax-prosemirror-utilities'

@injectable()
class MultipleChoiceQuestion extends Tools {
  title = 'Add Multiple Choice Question';
  label = 'Multiple Choice';
  name = 'Multiple Choice';

  get run() {

    return (state, dispatch) => {
      Commands.setBlockType(state.config.schema.nodes.multiple_choice)(state, dispatch);
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
}

export default MultipleChoiceQuestion;
