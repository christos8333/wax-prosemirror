import { injectable, multiInject } from "inversify";

@injectable()
export default class MenuCollection {
  menus = [];
  constructor(@multiInject("Menu") menus) {
    this.menus = menus;
  }

  getMenu(name) {
    return this.menus.find(menu => menu.name === name);
  }
}
