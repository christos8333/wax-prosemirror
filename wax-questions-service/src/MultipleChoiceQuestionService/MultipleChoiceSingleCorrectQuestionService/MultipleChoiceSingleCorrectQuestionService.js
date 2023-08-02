import { Service } from 'wax-prosemirror-core';
import MultipleChoiceSingleCorrectQuestion from './MultipleChoiceSingleCorrectQuestion';
import multipleChoiceSingleCorrectNode from './schema/multipleChoiceSingleCorrectNode';
import multipleChoiceSingleCorrectContainerNode from './schema/multipleChoiceSingleCorrectContainerNode';
import questionSingleNode from './schema/questionSingleNode';
import AnswerComponent from './components/AnswerComponent';
import MultipleChoiceSingleCorrectContainerNodeView from './MultipleChoiceSingleCorrectContainerNodeView';
import MultipleChoiceSingleCorrectNodeView from './MultipleChoiceSingleCorrectNodeView';
import QuestionMultipleSingleNodeView from './QuestionMultipleSingleNodeView';
import QuestionComponent from '../components/QuestionComponent';

class MultipleChoiceSingleCorrectQuestionService extends Service {
  register() {
    this.container
      .bind('MultipleChoiceSingleCorrectQuestion')
      .to(MultipleChoiceSingleCorrectQuestion);
    const createNode = this.container.get('CreateNode');
    const addPortal = this.container.get('AddPortal');

    createNode({
      multiple_choice_single_correct_container: multipleChoiceSingleCorrectContainerNode,
    });

    createNode({
      multiple_choice_single_correct: multipleChoiceSingleCorrectNode,
    });

    createNode({
      question_node_multiple_single: questionSingleNode,
    });

    // addPortal({
    //   nodeView: MultipleChoiceSingleCorrectContainerNodeView,
    //   component: QuestionComponent,
    //   context: this.app,
    // });

    addPortal({
      nodeView: QuestionMultipleSingleNodeView,
      component: QuestionComponent,
      context: this.app,
    });

    addPortal({
      nodeView: MultipleChoiceSingleCorrectNodeView,
      component: AnswerComponent,
      context: this.app,
    });
  }
}

export default MultipleChoiceSingleCorrectQuestionService;
