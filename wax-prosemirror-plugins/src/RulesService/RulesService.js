import Service from "wax-prosemirror-core/src/services/Service";

export default class RulesService extends Service {
  name = "RulesService";
  boot() {
    console.log("boot");
  }
}
