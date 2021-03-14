import { injectable, inject } from 'inversify';
import ToolGroup from '../../lib/ToolGroup';

@injectable()
class Base extends ToolGroup {
  tools = [];
  constructor(
    @inject('Undo') undo,
    @inject('Redo') redo,
    @inject('Save') save,
  ) {
    super();
    this.tools = [undo, redo, save];
  }
}

export default Base;
