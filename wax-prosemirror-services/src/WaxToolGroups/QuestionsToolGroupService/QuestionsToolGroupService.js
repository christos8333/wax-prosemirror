import Service from '../../Service';
import Questions from './Questions';

class QuestionsToolGroupService extends Service {
  register() {
    this.container.bind('Questions').to(Questions);
  }
}

export default QuestionsToolGroupService;
