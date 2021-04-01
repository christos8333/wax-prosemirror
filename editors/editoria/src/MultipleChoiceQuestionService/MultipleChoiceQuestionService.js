import { Service } from 'wax-prosemirror-services';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';

class MultipleChoiceQuestionService extends Service {
  boot() {}

  register() {
    this.container.bind('MultipleChoiceQuestion').to(MultipleChoiceQuestion);
    const createNode = this.container.get('CreateNode');
    console.log(createNode);
  }
}

export default MultipleChoiceQuestionService;
