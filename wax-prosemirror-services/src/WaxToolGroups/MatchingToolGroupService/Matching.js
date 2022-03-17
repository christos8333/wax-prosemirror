import { injectable, inject } from 'inversify';
import ToolGroup from '../../lib/ToolGroup';

@injectable()
class Matching extends ToolGroup {
  tools = [];
  constructor(@inject('MatchingQuestion') matchingQuestion) {
    super();
    this.tools = [matchingQuestion];
  }
}

export default Matching;
