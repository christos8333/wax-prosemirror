import Service from "../../Service";
import { liftListItem, sinkListItem } from "prosemirror-schema-list";
import Lift from "./Lift";

class LiftService extends Service {
  boot() {
    const shortCuts = this.container.get("ShortCuts");
    // shortCuts.addShortCut({
    //   "Mod-[": liftListItem(this.schema.nodes.list_item),
    //   "Mod-]": sinkListItem(this.schema.nodes.list_item)
    // });
  }

  register() {
    this.container.bind("Lift").to(Lift);
  }
}

export default LiftService;
