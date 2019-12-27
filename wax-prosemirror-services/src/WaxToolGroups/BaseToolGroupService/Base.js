import { injectable, inject } from "inversify";
import ToolGroup from "../../lib/ToolGroup";

@injectable()
class Base extends ToolGroup {
  tools = [];
  constructor(@inject("Undo") undo, @inject("Redo") redo) {
    super();
    this.tools = [undo, redo];
  }

  renderTools(view) {
    const tools = [];
    this.tools.forEach(tool => {
      tools.push(tool.renderTool(view));
    });
    return tools;
  }
}

export default Base;
