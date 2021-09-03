import { Service } from 'wax-prosemirror-services';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import multipleChoiceNode from './schema/multipleChoiceNode';
import QuestionComponent from './components/QuestionComponent';
import MultipleChoiceNodeView from './MultipleChoiceNodeView';

class MultipleChoiceQuestionService extends Service {
  boot() {}

  register() {
    this.container.bind('MultipleChoiceQuestion').to(MultipleChoiceQuestion);
    const createNode = this.container.get('CreateNode');

    createNode({
      multiple_choice: multipleChoiceNode,
    });

    createNode({
      multiple_choice_container: {
        attrs: {
          id: { default: '' },
          class: { default: 'mutiple-choice' },
        },
        group: 'block',
        atom: true,
        content: 'block+',
        parseDOM: [
          {
            tag: 'div.mutiple-choice',
            getAttrs(dom) {
              return {
                id: dom.dataset.id,
                class: dom.getAttribute('class'),
              };
            },
          },
        ],
        toDOM(node) {
          return ['div', node.attrs, 0];
        },
      },
    });

    const addPortal = this.container.get('AddPortal');
    addPortal({
      nodeView: MultipleChoiceNodeView,
      component: QuestionComponent,
      context: this.app,
    });
  }
}

export default MultipleChoiceQuestionService;
