import { injectable, inject } from "inversify";
import ToolGroup from "../../lib/ToolGroup";

@injectable()
class Images extends ToolGroup {
  tools = [];
  constructor(@inject("Image") image) {
    super();
    this.tools = [image];
  }

  renderTools(view) {
    const tools = [];
    this.tools.forEach(tool => {
      tools.push(tool.renderTool(view));
    });
    return tools;
  }
}

export default Images;
