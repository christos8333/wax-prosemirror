import Service from '../../Service';
import TrueFalseSingleCorrectQuestion from './TrueFalseSingleCorrectQuestion';
import trueFalseSingleCorrectNode from './schema/trueFalseSingleCorrectNode';
import trueFalseSingleCorrectContainerNode from './schema/trueFalseSingleCorrectContainerNode';
import QuestionComponent from './components/QuestionComponent';
import TrueFalseSingleCorrectNodeView from './TrueFalseSingleCorrectNodeView';

class TrueFalseSingleCorrectQuestionService extends Service {
  register() {
    this.container
      .bind('TrueFalseSingleCorrectQuestion')
      .to(TrueFalseSingleCorrectQuestion);
    const createNode = this.container.get('CreateNode');
    const addPortal = this.container.get('AddPortal');

    createNode({
      true_false_single_correct: trueFalseSingleCorrectNode,
    });

    createNode({
      true_false_single_correct_container: trueFalseSingleCorrectContainerNode,
    });

    addPortal({
      nodeView: TrueFalseSingleCorrectNodeView,
      component: QuestionComponent,
      context: this.app,
    });
  }
}

export default TrueFalseSingleCorrectQuestionService;
