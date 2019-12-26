import UndoService from "./UndoService/UndoService";
import RedoService from "./RedoService/RedoService";
import SaveService from "./SaveService/SaveService";

export default [new UndoService(), new RedoService()];
