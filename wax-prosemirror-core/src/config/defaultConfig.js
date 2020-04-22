import {
  SchemaService,
  MenuService,
  RulesService,
  ShortCutsService,
  LayoutService
} from "wax-prosemirror-services";

export default {
  services: [
    new SchemaService(),
    new RulesService(),
    new ShortCutsService(),
    new LayoutService(),
    new MenuService()
  ]
};
