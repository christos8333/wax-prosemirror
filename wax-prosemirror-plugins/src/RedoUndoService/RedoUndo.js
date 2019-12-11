import { injectable, inject } from "inversify";
import ToolGroup from "../lib/ToolGroup";

@injectable()
export default class RedoUndo extends ToolGroup {
  tools = [];
  constructor(@inject("Redo") redo, @inject("Undo") undo) {
    super();
    this.tools = [redo, undo];
  }

  renderTools(view) {
    const tools = [];
    this.tools.forEach(tool => {
      tools.push(tool.renderTool(view));
    });
    return tools;
  }
}
