import Service from '../../Service';
import MultipleChoice from './MultipleChoice';

class MultipleChoiceToolGroupService extends Service {
  register() {
    this.container.bind('MultipleChoice').to(MultipleChoice);
  }
}

export default MultipleChoiceToolGroupService;
