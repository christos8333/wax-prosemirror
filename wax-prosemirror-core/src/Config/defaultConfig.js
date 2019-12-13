import LayoutService from "../services/LayoutService/LayoutService";
import {
  AnnotationService,
  ImageService,
  MenuService,
  RedoUndoService,
  PlaceholderService,
  RulesService,
  ShortCutsService,
  TextStyleService,
  PluginsService
} from "wax-prosemirror-plugins";

export default {
  services: [
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
