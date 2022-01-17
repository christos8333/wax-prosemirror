import { injectable, inject } from 'inversify';
import ToolGroup from '../../lib/ToolGroup';

@injectable()
class Essay extends ToolGroup {
  tools = [];
  constructor(@inject('EssayQuestion') essayQuestion) {
    super();
    this.tools = [essayQuestion];
  }
}

export default Essay;
