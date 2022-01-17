import { injectable, inject } from 'inversify';
import ToolGroup from '../../lib/ToolGroup';

@injectable()
class MultipleChoice extends ToolGroup {
  tools = [];
  constructor(
    @inject('MultipleChoiceQuestion') multipleChoiceQuestion,
    @inject('MultipleChoiceSingleCorrectQuestion')
    multipleChoiceSingleCorrectQuestion,
  ) {
    super();
    this.tools = [multipleChoiceQuestion, multipleChoiceSingleCorrectQuestion];
  }
}

export default MultipleChoice;
