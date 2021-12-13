import { injectable, inject } from 'inversify';
import ToolGroup from '../../lib/ToolGroup';

@injectable()
class MultipleChoice extends ToolGroup {
  tools = [];
  constructor(
    @inject('MultipleChoiceQuestion') multipleChoiceQuestion,
    @inject('MultipleChoiceSingleCorrectQuestion')
    multipleChoiceSingleCorrectQuestion,
    @inject('EssayQuestion')
    essayQuestion,
  ) {
    super();
    this.tools = [multipleChoiceQuestion, essayQuestion];
  }
}

export default MultipleChoice;
