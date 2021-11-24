import Service from '../Service';
import TrueFalseQuestion from './TrueFalseQuestion';
// import multipleChoiceSingleCorrectNode from './schema/multipleChoiceSingleCorrectNode';
// import multipleChoiceSingleCorrectContainerNode from './schema/multipleChoiceSingleCorrectContainerNode';
// import QuestionComponent from './components/QuestionComponent';
import TrueFalseNodeView from './TrueFalseNodeView';

class TrueFalseQuestionService extends Service {
  register() {
    this.container.bind('TrueFalseQuestion').to(TrueFalseQuestion);
    const createNode = this.container.get('CreateNode');
    const addPortal = this.container.get('AddPortal');

    // createNode({
    //   multiple_choice_single_correct: multipleChoiceSingleCorrectNode,
    // });

    // createNode({
    //   multiple_choice_single_correct_container: multipleChoiceSingleCorrectContainerNode,
    // });

    // addPortal({
    //   nodeView: TrueFalseNodeView,
    //   component: QuestionComponent,
    //   context: this.app,
    // });
  }
}

export default TrueFalseQuestionService;
