import LayoutService from "../services/LayoutService/LayoutService";
import { MenuService, RedoUndoService } from "wax-prosemirror-plugins";

export default {
  services: [new LayoutService(), new MenuService(), new RedoUndoService()]
};
