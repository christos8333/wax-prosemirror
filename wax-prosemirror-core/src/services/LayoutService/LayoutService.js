import Service from "../Service";
import Layout from "./Layout";
export default class LayoutService extends Service {
  name = "LayoutService";

  boot() {
    const Layout = this.container.get("Layout");
  }
  register() {
    this.container
      .bind("Layout")
      .to(Layout)
      .inSingletonScope();
  }
}
