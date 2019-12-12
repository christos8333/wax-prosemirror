import Service from "wax-prosemirror-core/src/services/Service";
import Rules from "./Rules";

export default class RulesService extends Service {
  name = "RulesService";

  boot() {}

  register() {
    this.container.bind("Rules").toFactory(context => {
      return new Rules(this.config[0]);
    });
    this.container.get("Rules");
  }
}
