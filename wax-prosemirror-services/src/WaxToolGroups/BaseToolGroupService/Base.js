import { injectable, inject } from 'inversify';
import ToolGroup from '../../lib/ToolGroup';

@injectable()
class Base extends ToolGroup {
  tools = [];
  constructor(@inject('Undo') undo, @inject('Redo') redo) {
    super();
    this.tools = [undo, redo];
  }
}

export default Base;
