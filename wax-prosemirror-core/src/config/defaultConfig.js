import LayoutService from "../services/LayoutService/LayoutService";
import {
  SchemaService,
  MenuService,
  RulesService,
  ShortCutsService,
  /*TODO MOVE FROM DEFAULT CONFIG*/
  ImageService,
  PlaceholderService,
  TextStyleService,
  InlineAnnotationsService,
  LinkService,
  OverlayService,
  ListsService,
  ListToolGroupService,
  TablesService,
  TableToolGroupService,
  BaseService,
  BaseToolGroupService,
  ImageToolGroupService
} from "wax-prosemirror-services";

export default {
  services: [
    new SchemaService(),
    new RulesService(),
    new ShortCutsService(),
    new LayoutService(),
    new MenuService(),
    new ListToolGroupService(),
    new TextStyleService(),
    new PlaceholderService(),
    new ImageService(),
    new InlineAnnotationsService(),
    // new OverlayService()
    new LinkService(),
    new ListsService(),
    new TableToolGroupService(),
    new TablesService(),
    new BaseService(),
    new BaseToolGroupService(),
    new ImageToolGroupService()
  ]
};
