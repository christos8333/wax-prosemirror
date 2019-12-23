import { injectable, inject } from "inversify";
import ToolGroup from "../../lib/ToolGroup";

@injectable()
class Table extends ToolGroup {
  tools = [];
  constructor(
    @inject("OrderedList") orderedlist,
    @inject("BulletList") bulletlist,
    @inject("JoinUp") joinup,
    @inject("Lift") lift
  ) {
    super();
    this.tools = [orderedlist, bulletlist, joinup, lift];
  }

  renderTools(view) {
    const tools = [];
    this.tools.forEach(tool => {
      tools.push(tool.renderTool(view));
    });
    return tools;
  }
}

export default Table;
