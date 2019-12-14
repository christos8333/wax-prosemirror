import LayoutService from "../services/LayoutService/LayoutService";
import {
  AnnotationService,
  ImageService,
  MenuService,
  RedoUndoService,
  PlaceholderService,
  ImageService,
  RulesService,
  SchemaService,
  ShortCutsService,
  TextStyleService,
  PluginsService
} from "wax-prosemirror-plugins";

export default {
  services: [
    new SchemaService(),
    new RulesService(),
    new ShortCutsService(),
    new PluginsService(),
    new LayoutService(),
    new MenuService(),
    new RedoUndoService(),
    new AnnotationService(),
    new TextStyleService(),
    new PlaceholderService(),
    new ImageService()
  ]
};
