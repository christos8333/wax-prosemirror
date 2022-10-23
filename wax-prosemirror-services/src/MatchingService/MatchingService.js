import { Service } from 'wax-prosemirror-core';
import MatchingQuestion from './MatchingQuestion';
import matchingContainerNode from './schema/matchingContainerNode';
import matchingOptionNode from './schema/matchingOptionNode';
import MatchingContainerNodeView from './MatchingContainerNodeView';
import MatchingOptionNodeView from './MatchingOptionNodeView';
import MatchingContainerComponent from './components/MatchingContainerComponent';
import MatchingOptionComponent from './components/MatchingOptionComponent';

class MatchingService extends Service {
  name = 'MatchingService';

  register() {
    this.container.bind('MatchingQuestion').to(MatchingQuestion);
    const createNode = this.container.get('CreateNode');
    const addPortal = this.container.get('AddPortal');

    createNode({
      matching_container: matchingContainerNode,
    });

    createNode({
      matching_option: matchingOptionNode,
    });

    addPortal({
      nodeView: MatchingContainerNodeView,
      component: MatchingContainerComponent,
      context: this.app,
    });

    addPortal({
      nodeView: MatchingOptionNodeView,
      component: MatchingOptionComponent,
      context: this.app,
    });
  }
}

export default MatchingService;
