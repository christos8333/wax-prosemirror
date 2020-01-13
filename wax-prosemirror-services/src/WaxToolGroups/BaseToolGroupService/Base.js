import { injectable, inject } from "inversify";
import ToolGroup from "../../lib/ToolGroup";

@injectable()
class Base extends ToolGroup {
  tools = [];
  constructor(
    @inject("Undo") undo,
    @inject("Redo") redo,
    @inject("Note") note
  ) {
    super();
    this.tools = [undo, redo, note];
  }
}

export default Base;
