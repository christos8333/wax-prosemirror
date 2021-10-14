import { injectable, inject } from 'inversify';
import ToolGroup from '../../lib/ToolGroup';

@injectable()
class MultipleChoice extends ToolGroup {
  tools = [];
  constructor(@inject('MultipleChoiceQuestion') multipleChoiceQuestion) {
    super();
    this.tools = [multipleChoiceQuestion];
  }
}

export default MultipleChoice;
