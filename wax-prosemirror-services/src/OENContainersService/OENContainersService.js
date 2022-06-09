import { OenNodes } from 'wax-prosemirror-schema';
import Service from '../Service';
import OENContainersTool from './OENContainersTool';
import './oenContainers.css';

class OENContainersService extends Service {
  name = 'OENContainersService';

  register() {
    this.container.bind('OENContainersTool').to(OENContainersTool);
    const createNode = this.container.get('CreateNode');

    Object.keys(OenNodes).forEach(node => {
      console.log(node);
      createNode({
        [node]: OenNodes[node],
      });
    });
  }
}

export default OENContainersService;
