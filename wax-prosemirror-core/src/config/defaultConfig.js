import LayoutService from "../services/LayoutService/LayoutService";
import {
  AnnotationService,
  ImageService,
  MenuService,
  SchemaService,
  RedoUndoService,
  PlaceholderService,
  RulesService,
  ShortCutsService,
  TextStyleService,
  InlineAnnotationsService,
  LinkService,
  OverlayService
} from "wax-prosemirror-services";

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
    new InlineAnnotationsService(),
    new LinkService()
    // new OverlayService()
  ]
};
