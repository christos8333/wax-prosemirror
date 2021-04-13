import { Service } from 'wax-prosemirror-services';
// import { MultipleChoicePlugin } from 'wax-prosemirror-plugins';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import multipleChoiceNode from './schema/multipleChoiceNode';
import TestComponentPortal from './components/TestComponentPortal';

class MultipleChoiceQuestionService extends Service {
  boot() {
    // this.app.PmPlugins.add(
    //   'multipleChoicePlugin',
    //   MultipleChoicePlugin('multipleChoicePlugin'),
    // );
  }

  register() {
    this.container.bind('MultipleChoiceQuestion').to(MultipleChoiceQuestion);
    const createNode = this.container.get('CreateNode');
    createNode({
      multiple_choice: multipleChoiceNode,
    });
    // console.log(this.schema);
  }
}

export default MultipleChoiceQuestionService;
