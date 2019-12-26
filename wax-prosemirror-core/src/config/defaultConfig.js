import LayoutService from "../services/LayoutService/LayoutService";
import {
  SchemaService,
  MenuService,
  RulesService,
  ShortCutsService,
  /*TODO MOVE FROM DEFAULT CONFIG*/
  AnnotationToolGroupService,
  ImageService,
  PlaceholderService,
  TextStyleService,
  InlineAnnotationsService,
  LinkService,
  ListsService,
  ListToolGroupService,
  TablesService,
  TableToolGroupService,
  BaseService,
  BaseToolGroupService
} from "wax-prosemirror-services";

export default {
  services: [
    new SchemaService(),
    new RulesService(),
    new ShortCutsService(),
    new LayoutService(),
    new MenuService(),
    new AnnotationToolGroupService(),
    new ListToolGroupService(),
    new TextStyleService(),
    new PlaceholderService(),
    new ImageService(),
    new InlineAnnotationsService(),
    new LinkService(),
    new ListsService(),
    new TableToolGroupService(),
    new TablesService(),
    new BaseService(),
    new BaseToolGroupService()
  ]
};
