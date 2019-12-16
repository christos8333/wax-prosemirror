import LayoutService from "../services/LayoutService/LayoutService";
import {
  AnnotationService,
  ImageService,
  MenuService,
  RedoUndoService,
  PlaceholderService,
  RulesService,
  SchemaService,
  ShortCutsService,
  TextStyleService,
  InlineAnnotationsService
} from "wax-prosemirror-plugins";

export default {
  services: [
    new SchemaService(),
    new RulesService(),
    new ShortCutsService(),
    new LayoutService(),
    new MenuService(),
    new RedoUndoService(),
    new AnnotationService(),
    new TextStyleService(),
    new PlaceholderService(),
    new ImageService(),
    new InlineAnnotationsService()
  ]
};
