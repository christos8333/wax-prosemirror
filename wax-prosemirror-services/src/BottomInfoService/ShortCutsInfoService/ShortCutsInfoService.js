import { Service } from 'wax-prosemirror-core';
import ShortCutsInfoTool from './ShortCutsInfoTool';

export default class ShortCutsInfoService extends Service {
  register() {
    this.container.bind('ShortCutsInfoTool').to(ShortCutsInfoTool);
  }
}
