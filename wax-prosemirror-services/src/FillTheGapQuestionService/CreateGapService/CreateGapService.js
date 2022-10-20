import { Service } from 'wax-prosemirror-core';
import CreateGap from './CreateGap';

class FillTheGapQuestionService extends Service {
  register() {
    this.container.bind('CreateGap').to(CreateGap);
  }
}

export default FillTheGapQuestionService;
