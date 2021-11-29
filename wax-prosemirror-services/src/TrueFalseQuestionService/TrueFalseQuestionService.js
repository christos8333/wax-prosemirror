import Service from '../Service';
import TrueFalseQuestion from './TrueFalseQuestion';
import trueFalseNode from './schema/trueFalseNode';
import trueFalseContainerNode from './schema/trueFalseContainerNode';
import QuestionComponent from './components/QuestionComponent';
import TrueFalseNodeView from './TrueFalseNodeView';

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

    addPortal({
      nodeView: TrueFalseNodeView,
      component: QuestionComponent,
      context: this.app,
    });
  }
}

export default TrueFalseQuestionService;
