import { injectable, inject } from "inversify";
import GroupTool from "../lib/GroupTool";

@injectable()
export default class RedoUndo extends GroupTool {
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
