import Service from '../../Service';
import TrueFalseQuestion from './TrueFalseQuestion';
import trueFalseNode from './schema/trueFalseNode';
import questionTrueFalseNode from './schema/questionTrueFalseNode';
import trueFalseContainerNode from './schema/trueFalseContainerNode';
import AnswerComponent from './components/AnswerComponent';
import TrueFalseNodeView from './TrueFalseNodeView';
import QuestionTrueFalseNodeView from './QuestionTrueFalseNodeView';
import QuestionComponent from '../components/QuestionComponent';

class TrueFalseQuestionService extends Service {
  register() {
    this.container.bind('TrueFalseQuestion').to(TrueFalseQuestion);
    const createNode = this.container.get('CreateNode');
    const addPortal = this.container.get('AddPortal');

    createNode({
      true_false_container: trueFalseContainerNode,
    });

    createNode({
      true_false: trueFalseNode,
    });

    createNode({
      question_node_true_false: questionTrueFalseNode,
    });

    addPortal({
      nodeView: QuestionTrueFalseNodeView,
      component: QuestionComponent,
      context: this.app,
    });

    addPortal({
      nodeView: TrueFalseNodeView,
      component: AnswerComponent,
      context: this.app,
    });
  }
}

export default TrueFalseQuestionService;
