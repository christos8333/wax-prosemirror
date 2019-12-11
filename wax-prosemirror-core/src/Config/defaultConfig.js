import LayoutService from "../services/LayoutService/LayoutService";
import {
  MenuService,
  AnnotationService,
  RedoUndoService,
  TextStyleService,
  PlaceholderService,
  ImageService
} from "wax-prosemirror-plugins";

export default {
  services: [
    new LayoutService(),
    new MenuService(),
    new RedoUndoService(),
    new AnnotationService(),
    new TextStyleService(),
    new PlaceholderService(),
    new ImageService()
  ]
};
