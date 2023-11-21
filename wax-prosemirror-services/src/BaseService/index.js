import UndoService from './UndoService/UndoService';
import RedoService from './RedoService/RedoService';
import SaveService from './SaveService/SaveService';
import BaseToolGroupService from './BaseToolGroupService/BaseToolGroupService';

export default [
  new UndoService(),
  new RedoService(),
  new SaveService(),
  new BaseToolGroupService(),
];
