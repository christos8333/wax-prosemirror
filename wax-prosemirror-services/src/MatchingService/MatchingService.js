import Service from '../Service';
import MatchingQuestion from './MatchingQuestion';
import matchingContainerNode from './schema/matchingContainerNode';
import MatchingContainerNodeView from './MatchingContainerNodeView';
import MatchingContainerComponent from './components/MatchingContainerComponent';

class MatchingService extends Service {
  name = 'MatchingService';

  register() {
    this.container.bind('MatchingQuestion').to(MatchingQuestion);
    const createNode = this.container.get('CreateNode');
    const addPortal = this.container.get('AddPortal');

    createNode({
      matching_container: matchingContainerNode,
    });

    addPortal({
      nodeView: MatchingContainerNodeView,
      component: MatchingContainerComponent,
      context: this.app,
    });
  }
}

export default MatchingService;
