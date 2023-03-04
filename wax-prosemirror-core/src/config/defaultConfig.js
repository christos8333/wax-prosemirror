import SchemaService from './defaultServices/SchemaService/SchemaService';
import RulesService from './defaultServices/RulesService/RulesService';
import ShortCutsService from './defaultServices/ShortCutsService/ShortCutsService';
import LayoutService from './defaultServices/LayoutService/LayoutService';
import PortalService from './defaultServices/PortalService/PortalService';
import MenuService from './defaultServices/MenuService/MenuService';
import OverlayService from './defaultServices/OverlayService/OverlayService';
import CorePluginsService from './defaultServices/CorePluginsService/CorePluginsService';

export default () => ({
  services: [
    new SchemaService(),
    new RulesService(),
    new ShortCutsService(),
    new LayoutService(),
    new PortalService(),
    new MenuService(),
    new OverlayService(),
    new CorePluginsService(),
  ],
});
