import Service from '../../../Service';
import { isPlainObject, isFunction } from 'lodash';
import Menu from './Menu';
import MenuCollection from './MenuCollection';

class MenuService extends Service {
  name = 'MenuService';

  boot() {
    if (this.app.config.get('config.MenuService') === undefined) return false;
    const { menus } = this.container.get('MenuCollection');
    const layout = this.container.get('Layout');
    menus.forEach(menu => {
      layout.addComponent(menu.config.templateArea, menu.render());
    });
  }

  register() {
    if (this.app.config.get('config.MenuService') === undefined) return false;
    /* create Menu Factory */
    this.config.map(conf => {
      this.container.bind('Menu').toFactory(context => {
        return new Menu(conf, context.container.get('createTools'));
      });
    });

    /* create MenuCollection of Menus */
    this.container.bind('MenuCollection').to(MenuCollection).inSingletonScope();

    /* create factory of tools */
    this.container.bind('createTools').toFactory(context => {
      return configTools => {
        const tools = [];
        configTools.forEach(tool => {
          try {
            let tl = {};
            if (isPlainObject(tool)) {
              tl = context.container.get(tool.name);
              tl.setGroupConfig(tool);
            } else if (isFunction(tool)) {
              tl = context.container.get(tool());
            } else {
              tl = context.container.get(tool);
            }
            tools.push(tl);
          } catch (error) {
            throw Error(
              `Could not load Service ${tool.name}. Please configure service through config`,
            );
          }
        });
        return tools;
      };
    });
  }
}
export default MenuService;
