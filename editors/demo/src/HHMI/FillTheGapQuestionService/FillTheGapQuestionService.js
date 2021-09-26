import { Service } from 'wax-prosemirror-services';
import FillTheGapQuestion from './FillTheGapQuestion';

class FillTheGapQuestionService extends Service {
  register() {
    this.container.bind('FillTheGapQuestion').to(FillTheGapQuestion);
    const createNode = this.container.get('CreateNode');
    const addPortal = this.container.get('AddPortal');
  }
}

export default FillTheGapQuestionService;
