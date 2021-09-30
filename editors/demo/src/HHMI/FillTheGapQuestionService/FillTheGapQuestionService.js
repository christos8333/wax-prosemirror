import { Service } from 'wax-prosemirror-services';
import FillTheGapQuestion from './FillTheGapQuestion';
import fillTheGapContainerNode from './schema/fillTheGapContainerNode';
import fillTheGapNode from './schema/fillTheGapNode';
import CreateGapService from './CreateGapService/CreateGapService';

class FillTheGapQuestionService extends Service {
  register() {
    this.container.bind('FillTheGapQuestion').to(FillTheGapQuestion);
    const createNode = this.container.get('CreateNode');
    const addPortal = this.container.get('AddPortal');

    createNode({
      fill_the_gap_container: fillTheGapContainerNode,
    });
  }
  dependencies = [new CreateGapService()];
}

export default FillTheGapQuestionService;
