import { Service } from 'wax-prosemirror-services';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import multipleChoiceNode from './schema/multipleChoiceNode';
// import feedBackNode from './schema/feedBackNode';
import QuestionComponent from './components/QuestionComponent';
// import FeedbackComponent from './components/FeedbackComponent';
import MultipleChoiceNodeView from './MultipleChoiceNodeView';
// import FeedBackNodeView from './FeedBackNodeView';

class MultipleChoiceQuestionService extends Service {
  boot() {}

  register() {
    this.container.bind('MultipleChoiceQuestion').to(MultipleChoiceQuestion);
    const createNode = this.container.get('CreateNode');

    createNode({
      multiple_choice: multipleChoiceNode,
    });

    // createNode({
    //   feedback: feedBackNode,
    // });

    createNode({
      question_wrapper: {
        group: 'block',
        atom: true,
        content: 'inline*',
        attrs: {
          class: { default: 'paragraph' },
        },
        parseDOM: [
          {
            tag: 'p.question',
            getAttrs(dom) {
              return {
                id: dom.dataset.id,
                class: dom.getAttribute('class'),
              };
            },
          },
        ],
        toDOM(node) {
          return ['p', node.attrs, 0];
        },
      },
    });

    const addPortal = this.container.get('AddPortal');
    addPortal({
      nodeView: MultipleChoiceNodeView,
      component: QuestionComponent,
      context: this.app,
    });
    // addPortal({
    //   nodeView: FeedBackNodeView,
    //   component: FeedbackComponent,
    //   context: this.app,
    // });
  }
}

export default MultipleChoiceQuestionService;
