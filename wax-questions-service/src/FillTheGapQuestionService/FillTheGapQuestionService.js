import { Service } from 'wax-prosemirror-core';
import FillTheGapQuestion from './FillTheGapQuestion';
import fillTheGapContainerNode from './schema/fillTheGapContainerNode';
import fillTheGapNode from './schema/fillTheGapNode';
import CreateGapService from './CreateGapService/CreateGapService';
import FillTheGapContainerNodeView from './FillTheGapContainerNodeView';
import FillTheGapNodeView from './FillTheGapNodeView';
import FillTheGapContainerComponent from './components/FillTheGapContainerComponent';
import GapComponent from './components/GapComponent';
import './fillTheGap.css';

class FillTheGapQuestionService extends Service {
  register() {
    this.container.bind('FillTheGapQuestion').to(FillTheGapQuestion);
    const createNode = this.container.get('CreateNode');
    const addPortal = this.container.get('AddPortal');

    createNode({
      fill_the_gap_container: fillTheGapContainerNode,
    });

    createNode({
      fill_the_gap: fillTheGapNode,
    });

    addPortal({
      nodeView: FillTheGapContainerNodeView,
      component: FillTheGapContainerComponent,
      context: this.app,
    });

    addPortal({
      nodeView: FillTheGapNodeView,
      component: GapComponent,
      context: this.app,
    });
  }

  dependencies = [new CreateGapService()];
}

export default FillTheGapQuestionService;
