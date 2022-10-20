import { Service } from 'wax-prosemirror-core';
import CounterInfoTool from './CounterInfoTool';

export default class CounterInfoService extends Service {
  register() {
    this.container.bind('CounterInfoTool').to(CounterInfoTool);
  }
}
