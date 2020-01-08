import { injectable, inject } from "inversify";
import ToolGroup from "../../lib/ToolGroup";

@injectable()
class Text extends ToolGroup {
  tools = [];
  constructor() {
    super();
    this.tools = [];
  }
}

export default Text;
