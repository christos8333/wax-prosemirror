import LayoutService from "../services/LayoutService/LayoutService";
import {
  SchemaService,
  MenuService,
  RulesService,
  ShortCutsService,
  AnnotationToolGroupService
} from "wax-prosemirror-services";

export default {
  services: [
    new SchemaService(),
    new RulesService(),
    new ShortCutsService(),
    new LayoutService(),
    new MenuService(),
    new AnnotationToolGroupService()
  ]
};
