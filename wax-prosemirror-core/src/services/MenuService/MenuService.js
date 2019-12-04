import Menu from "./Menu";
export default class MenuService extends Services {
  boot() {}
  register() {
    this.container
      .bind("Menu")
      .to(Menu)
      .inSingletonScope();
  }
}
