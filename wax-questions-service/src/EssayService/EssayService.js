import { Service } from 'wax-prosemirror-core';
import EssayQuestion from './EssayQuestion';
import EssayQuestionContainerComponent from './components/EssayQuestionContainerComponent';
import essayContainerNode from './schema/essayContainerNode';
import essayPromptNode from './schema/essayPromptNode';
import essayQuestionNode from './schema/essayQuestionNode';
import essayAnswerNode from './schema/essayAnswerNode';
import EssayQuestionComponent from './components/EssayQuestionComponent';
import EssayPromptComponent from './components/EssayPromptComponent';
import EssayAnswerComponent from './components/EssayAnswerComponent';
import EssayQuestionContainerNodeView from './EssayQuestionContainerNodeView';
import EssayQuestionNodeView from './EssayQuestionNodeView';
import EssayPromptNodeView from './EssayPromptNodeView';
import EssayAnswerNodeView from './EssayAnswerNodeView';
import './essay.css';

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
      essay_prompt: essayPromptNode,
    });

    createNode({
      essay_answer: essayAnswerNode,
    });

    addPortal({
      nodeView: EssayQuestionContainerNodeView,
      component: EssayQuestionContainerComponent,
      context: this.app,
    });

    addPortal({
      nodeView: EssayQuestionNodeView,
      component: EssayQuestionComponent,
      context: this.app,
    });

    addPortal({
      nodeView: EssayPromptNodeView,
      component: EssayPromptComponent,
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
