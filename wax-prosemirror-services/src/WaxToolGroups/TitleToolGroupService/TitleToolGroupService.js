import { Service } from 'wax-prosemirror-core';
import TitleTool from './TitleTool';
import './titleTool.css';

class TitleToolGroupService extends Service {
  register() {
    this.container.bind('TitleTool').to(TitleTool);
  }
}

export default TitleToolGroupService;
