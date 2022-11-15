/* eslint-disable no-unused-vars */
import { injectable, multiInject } from 'inversify';

@injectable()
class MenuCollection {
  menus = [];
  constructor(@multiInject('Menu') menus) {
    this.menus = menus;
  }

  getMenu(name) {
    return this.menus.find(menu => menu.name === name);
  }
}

export default MenuCollection;
