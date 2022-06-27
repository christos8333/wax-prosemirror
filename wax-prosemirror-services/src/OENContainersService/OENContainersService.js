import { OenNodes } from 'wax-prosemirror-schema';
import Service from '../Service';
import OENContainersTool from './OENContainersTool';
import OENAsideLongTool from './OENAsideLongTool';
import OENAsideShortTool from './OENAsideShortTool';
import './oenContainers.css';

class OENContainersService extends Service {
  name = 'OENContainersService';

  register() {
    this.container.bind('OENContainersTool').to(OENContainersTool);
    this.container.bind('OENAsideLongTool').to(OENAsideLongTool);
    this.container.bind('OENAsideShortTool').to(OENAsideShortTool);

    const createNode = this.container.get('CreateNode');

    Object.keys(OenNodes).forEach(node => {
      createNode({
        [node]: OenNodes[node],
      });
    });
  }
}

export default OENContainersService;
