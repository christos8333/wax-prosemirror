import { injectable, inject } from 'inversify';
import { ToolGroup } from 'wax-prosemirror-services';

@injectable()
class Questions extends ToolGroup {
  tools = [];
  constructor(@inject('MultipleChoiceQuestion') multipleChoiceQuestion) {
    super();
    this.tools = [multipleChoiceQuestion];
  }
}

export default Questions;
