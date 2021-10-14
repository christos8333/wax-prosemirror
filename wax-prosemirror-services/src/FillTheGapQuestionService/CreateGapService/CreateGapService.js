import Service from '../../Service';
import CreateGap from './CreateGap';

class FillTheGapQuestionService extends Service {
  register() {
    this.container.bind('CreateGap').to(CreateGap);
  }
}

export default FillTheGapQuestionService;
