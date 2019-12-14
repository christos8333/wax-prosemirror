import LayoutService from "../services/LayoutService/LayoutService";
import {
  MenuService,
  AnnotationService,
  RedoUndoService,
  TextStyleService,
  PlaceholderService,
  ImageService,
  RulesService,
  SchemaService
} from "wax-prosemirror-plugins";

export default {
  services: [
    new SchemaService(),
    new LayoutService(),
    new MenuService(),
    new RedoUndoService(),
    new AnnotationService(),
    new TextStyleService(),
    new PlaceholderService(),
    new ImageService(),
    new RulesService()
  ]
};
