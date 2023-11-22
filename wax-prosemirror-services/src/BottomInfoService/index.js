import CounterInfoService from './CounterInfoService/CounterInfoService';
import ShortCutsInfoService from './ShortCutsInfoService/ShortCutsInfoService';
import EditorInfoToolGroupService from './InfoToolGroupService/EditorInfoToolGroupService';

export default [
  new CounterInfoService(),
  new ShortCutsInfoService(),
  new EditorInfoToolGroupService(),
];
