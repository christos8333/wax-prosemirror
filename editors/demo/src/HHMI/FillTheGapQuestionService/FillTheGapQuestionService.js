import { Service } from 'wax-prosemirror-services';

class FillTheGapQuestionService extends Service {
  register() {
    const createNode = this.container.get('CreateNode');
    const addPortal = this.container.get('AddPortal');
  }
}

export default FillTheGapQuestionService;
