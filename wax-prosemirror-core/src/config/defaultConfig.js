import {
  SchemaService,
  MenuService,
  RulesService,
  ShortCutsService,
  LayoutService,
  OverlayService,
  PortalService,
} from 'wax-prosemirror-services';

export default () => ({
  services: [
    new SchemaService(),
    new RulesService(),
    new ShortCutsService(),
    new LayoutService(),
    new PortalService(),
    new MenuService(),
    new OverlayService(),
  ],
});
