import LayoutService from "../services/LayoutService/LayoutService";
import {
  AnnotationToolGroupService,
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
  ListsService,
  ListToolGroupService,
  TablesService,
  TableToolGroupService
} from "wax-prosemirror-services";

export default {
  services: [
    new SchemaService(),
    new RulesService(),
    new ShortCutsService(),
    new LayoutService(),
    new MenuService(),
    new RedoUndoService(),
    new AnnotationToolGroupService(),
    new ListToolGroupService(),
    new TextStyleService(),
    new PlaceholderService(),
    new ImageService(),
    new InlineAnnotationsService(),
    new LinkService(),
    new ListsService(),
    new TableToolGroupService(),
    new TablesService()
  ]
};
