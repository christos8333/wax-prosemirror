import Service from '../../Service';
import MultipleChoiceSingleCorrectQuestion from './MultipleChoiceSingleCorrectQuestion';
import multipleChoiceSingleCorrectNode from './schema/multipleChoiceSingleCorrectNode';
import multipleChoiceSingleCorrectContainerNode from './schema/multipleChoiceSingleCorrectContainerNode';
import QuestionComponent from './components/QuestionComponent';
import MultipleChoiceSingleCorrectNodeView from './MultipleChoiceSingleCorrectNodeView';

class MultipleChoiceSingleCorrectQuestionService extends Service {
  register() {
    this.container
      .bind('MultipleChoiceSingleCorrectQuestion')
      .to(MultipleChoiceSingleCorrectQuestion);
    const createNode = this.container.get('CreateNode');
    const addPortal = this.container.get('AddPortal');

    createNode({
      multiple_choice_single_correct: multipleChoiceSingleCorrectNode,
    });

    createNode({
      multiple_choice_single_correct_container: multipleChoiceSingleCorrectContainerNode,
    });

    addPortal({
      nodeView: MultipleChoiceSingleCorrectNodeView,
      component: QuestionComponent,
      context: this.app,
    });
  }
}

export default MultipleChoiceSingleCorrectQuestionService;
