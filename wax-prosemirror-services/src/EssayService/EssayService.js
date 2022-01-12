import Service from '../Service';
import EssayQuestion from './EssayQuestion';
import essayContainerNode from './schema/essayContainerNode';
import essayQuestionNode from './schema/essayQuestionNode';
import essayAnswerNode from './schema/essayAnswerNode';
import EssayQuestionComponent from './components/EssayQuestionComponent';
import EssayNodeView from './EssayNodeView';

class EssayService extends Service {
  register() {
    this.container.bind('EssayQuestion').to(EssayQuestion);
    const createNode = this.container.get('CreateNode');
    const addPortal = this.container.get('AddPortal');

    createNode({
      essay_container: essayContainerNode,
    });

    createNode({
      essay_question: essayQuestionNode,
    });

    createNode({
      essay_answer: essayAnswerNode,
    });

    addPortal({
      nodeView: EssayNodeView,
      component: EssayQuestionComponent,
      context: this.app,
    });
  }
}

export default EssayService;
