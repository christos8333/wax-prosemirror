import Service from '../Service';
import EssayQuestion from './EssayQuestion';
import essayContainerNode from './schema/essayContainerNode';
import essayQuestionNode from './schema/essayQuestionNode';
import essayAnswerNode from './schema/essayAnswerNode';
import EssayQuestionComponent from './components/EssayQuestionComponent';
import EssayAnswerComponent from './components/EssayAnswerComponent';
import EssayQuestionNodeView from './EssayQuestionNodeView';
import EssayAnswerNodeView from './EssayAnswerNodeView';

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
      nodeView: EssayQuestionNodeView,
      component: EssayQuestionComponent,
      context: this.app,
    });

    addPortal({
      nodeView: EssayAnswerNodeView,
      component: EssayAnswerComponent,
      context: this.app,
    });
  }
}

export default EssayService;
