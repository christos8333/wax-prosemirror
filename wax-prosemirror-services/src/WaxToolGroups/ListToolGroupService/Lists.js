import { injectable, inject } from "inversify";
import ToolGroup from "../../lib/ToolGroup";

@injectable()
class Lists extends ToolGroup {
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
}

export default Lists;
