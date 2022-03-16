import Service from '../Service';
import MatchingQuestion from './MatchingQuestion';
import matchingContainerNode from './schema/matchingContainerNode';
import MatchingContainerNodeView from './MatchingContainerNodeView';

class MatchingService extends Service {
  name = 'MatchingService';

  register() {
    this.container.bind('MatchingQuestion').to(MatchingQuestion);
    const createNode = this.container.get('CreateNode');
    const addPortal = this.container.get('AddPortal');

    createNode({
      matching_container: matchingContainerNode,
    });

    // addPortal({
    //   nodeView: MatchingContainerNodeView,
    //   component: QuestionComponent,
    //   context: this.app,
    // });
  }
}

export default MatchingService;
