import { OenNodes } from 'wax-prosemirror-schema';
import Service from '../Service';
import OENContainersTool from './OENContainersTool';
import OENAsideTool from './OENAsideTool';
import './oenContainers.css';

class OENContainersService extends Service {
  name = 'OENContainersService';

  register() {
    this.container.bind('OENContainersTool').to(OENContainersTool);
    this.container.bind('OENAsideTool').to(OENAsideTool);
    const createNode = this.container.get('CreateNode');

    Object.keys(OenNodes).forEach(node => {
      createNode({
        [node]: OenNodes[node],
      });
    });
  }
}

export default OENContainersService;
