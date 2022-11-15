import { Service } from 'wax-prosemirror-core';
import CreateGap from './CreateGap';
import FillTheGapToolGroupService from '../../WaxToolGroups/FillTheGapToolGroupService/FillTheGapToolGroupService';

class FillTheGapQuestionService extends Service {
  register() {
    this.container.bind('CreateGap').to(CreateGap);
  }

  dependencies = [new FillTheGapToolGroupService()];
}

export default FillTheGapQuestionService;
