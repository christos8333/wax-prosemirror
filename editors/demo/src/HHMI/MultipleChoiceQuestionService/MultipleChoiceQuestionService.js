import { Service } from 'wax-prosemirror-services';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import multipleChoiceNode from './schema/multipleChoiceNode';

class MultipleChoiceQuestionService extends Service {
  boot() {}

  register() {
    this.container.bind('MultipleChoiceQuestion').to(MultipleChoiceQuestion);
    const createNode = this.container.get('CreateNode');
    createNode({
      multiple_choice: multipleChoiceNode,
    });
    console.log(this.schema);
  }
}

export default MultipleChoiceQuestionService;
