import { Service } from 'wax-prosemirror-services';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import multipleChoiceNode from './schema/multipleChoiceNode';
import TestComponent from './components/TestComponent';
import nodeView from './MultipleChoiceNodeView';

class MultipleChoiceQuestionService extends Service {
  boot() {}

  register() {
    this.container.bind('MultipleChoiceQuestion').to(MultipleChoiceQuestion);
    const createNode = this.container.get('CreateNode');

    createNode({
      multiple_choice: multipleChoiceNode,
    });

    const addPortal = this.container.get('AddPortal');
    addPortal({ nodeView, component: TestComponent, context: this.app });
  }
}

export default MultipleChoiceQuestionService;
