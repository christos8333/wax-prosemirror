import { injectable, inject } from "inversify";
import ToolGroup from "../../lib/ToolGroup";

@injectable()
class Tables extends ToolGroup {
  tools = [];
  constructor(
    @inject("Table") table,
    @inject("TableDropDownOptions") tableDropDownOptions
  ) {
    super();
    this.tools = [table, tableDropDownOptions];
  }

  renderTools(view) {
    const tools = [];
    this.tools.forEach(tool => {
      tools.push(tool.renderTool(view));
    });
    return tools;
  }
}

export default Tables;
