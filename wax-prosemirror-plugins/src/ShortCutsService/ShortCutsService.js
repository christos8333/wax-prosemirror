import Service from "wax-prosemirror-core/src/services/Service";
import ShortCuts from "./ShortCuts";

export default class ShortCutsService extends Service {
  name = "ShortCutsService";

  boot() {
    const shortCuts = this.container.get("ShortCuts");
    shortCuts.createShortCuts();
  }

  register() {
    const PmPlugins = this.app.PmPlugins;
    this.container
      .bind("ShortCuts")
      .toDynamicValue(() => {
        const { schema: { schema } } = this.app;

        return new ShortCuts(PmPlugins, schema);
      })
      .inSingletonScope();
  }
}
