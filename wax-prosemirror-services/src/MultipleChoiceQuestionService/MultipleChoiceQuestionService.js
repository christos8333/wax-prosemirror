import { Service } from 'wax-prosemirror-core';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import multipleChoiceNode from './schema/multipleChoiceNode';
import multipleChoiceContainerNode from './schema/multipleChoiceContainerNode';
import questionNode from './schema/questionNode';
import AnswerComponent from './components/AnswerComponent';
import QuestionComponent from './components/QuestionComponent';
import MultipleChoiceContainerNodeView from './MultipleChoiceContainerNodeView';
import MultipleChoiceNodeView from './MultipleChoiceNodeView';
import QuestionNodeView from './QuestionNodeView';
import MultipleChoiceSingleCorrectQuestionService from './MultipleChoiceSingleCorrectQuestionService/MultipleChoiceSingleCorrectQuestionService';
import TrueFalseQuestionService from './TrueFalseQuestionService/TrueFalseQuestionService';
import TrueFalseSingleCorrectQuestionService from './TrueFalseSingleCorrectQuestionService/TrueFalseSingleCorrectQuestionService';
import './multipleQuestionStyles.css';
import MoveCursorPlugin from './plugins/MoveCursorPlugin';

class MultipleChoiceQuestionService extends Service {
  boot() {
    // this.app.PmPlugins.add(
    //   'moveCursorPlugin',
    //   MoveCursorPlugin('moveCursorPlugin'),
    // );
  }

  register() {
    this.container.bind('MultipleChoiceQuestion').to(MultipleChoiceQuestion);
    const createNode = this.container.get('CreateNode');
    const addPortal = this.container.get('AddPortal');

    createNode({
      multiple_choice_container: multipleChoiceContainerNode,
    });

    createNode({
      multiple_choice: multipleChoiceNode,
    });

    createNode({
      question_node_multiple: questionNode,
    });

    // addPortal({
    //   nodeView: MultipleChoiceContainerNodeView,
    //   component: QuestionComponent,
    //   context: this.app,
    // });

    addPortal({
      nodeView: QuestionNodeView,
      component: QuestionComponent,
      context: this.app,
    });

    addPortal({
      nodeView: MultipleChoiceNodeView,
      component: AnswerComponent,
      context: this.app,
    });
  }

  dependencies = [
    new MultipleChoiceSingleCorrectQuestionService(),
    new TrueFalseQuestionService(),
    new TrueFalseSingleCorrectQuestionService(),
  ];
}

export default MultipleChoiceQuestionService;
