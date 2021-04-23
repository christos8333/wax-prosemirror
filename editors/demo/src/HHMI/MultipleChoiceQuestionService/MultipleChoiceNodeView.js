import { AbstractNodeView } from 'wax-prosemirror-services';

export default class MultipleChoiceNodeView extends AbstractNodeView {
  static name() {
    return 'multiple_choice';
  }

  update(node) {
    console.log('rwerwerwerrewer');
    return false;
  }
}
