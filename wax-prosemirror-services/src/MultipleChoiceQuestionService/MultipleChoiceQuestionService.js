import Service from '../Service';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import multipleChoiceNode from './schema/multipleChoiceNode';
import multipleChoiceContainerNode from './schema/multipleChoiceContainerNode';
import QuestionComponent from './components/QuestionComponent';
import MultipleChoiceNodeView from './MultipleChoiceNodeView';
import MultipleChoiceSingleCorrectQuestionService from './MultipleChoiceSingleCorrectQuestionService/MultipleChoiceSingleCorrectQuestionService';
import TrueFalseQuestionService from './TrueFalseQuestionService/TrueFalseQuestionService';

class MultipleChoiceQuestionService extends Service {
  register() {
    this.container.bind('MultipleChoiceQuestion').to(MultipleChoiceQuestion);
    const createNode = this.container.get('CreateNode');
    const addPortal = this.container.get('AddPortal');

    createNode({
      multiple_choice: multipleChoiceNode,
    });

    createNode({
      multiple_choice_container: multipleChoiceContainerNode,
    });

    addPortal({
      nodeView: MultipleChoiceNodeView,
      component: QuestionComponent,
      context: this.app,
    });
  }

  dependencies = [
    new MultipleChoiceSingleCorrectQuestionService(),
    new TrueFalseQuestionService(),
  ];
}

export default MultipleChoiceQuestionService;
