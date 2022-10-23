import { Service } from 'wax-prosemirror-core';
import TrueFalseSingleCorrectQuestion from './TrueFalseSingleCorrectQuestion';
import trueFalseSingleCorrectNode from './schema/trueFalseSingleCorrectNode';
import trueFalseSingleCorrectContainerNode from './schema/trueFalseSingleCorrectContainerNode';
import questionTrueFalseSingleNode from './schema/questionTrueFalseSingleNode';
import AnswerComponent from './components/AnswerComponent';
import TrueFalseSingleCorrectContainerNodeView from './TrueFalseSingleCorrectContainerNodeView';
import TrueFalseSingleCorrectNodeView from './TrueFalseSingleCorrectNodeView';
import QuestionTrueFalseSingleNodeView from './QuestionTrueFalseSingleNodeView';
import QuestionComponent from '../components/QuestionComponent';

class TrueFalseSingleCorrectQuestionService extends Service {
  register() {
    this.container
      .bind('TrueFalseSingleCorrectQuestion')
      .to(TrueFalseSingleCorrectQuestion);
    const createNode = this.container.get('CreateNode');
    const addPortal = this.container.get('AddPortal');

    createNode({
      true_false_single_correct_container: trueFalseSingleCorrectContainerNode,
    });

    createNode({
      question_node_true_false_single: questionTrueFalseSingleNode,
    });

    createNode({
      true_false_single_correct: trueFalseSingleCorrectNode,
    });

    // addPortal({
    //   nodeView: TrueFalseSingleCorrectContainerNodeView,
    //   component: QuestionComponent,
    //   context: this.app,
    // });

    addPortal({
      nodeView: QuestionTrueFalseSingleNodeView,
      component: QuestionComponent,
      context: this.app,
    });

    addPortal({
      nodeView: TrueFalseSingleCorrectNodeView,
      component: AnswerComponent,
      context: this.app,
    });
  }
}

export default TrueFalseSingleCorrectQuestionService;
