import { OenContainerNode } from 'wax-prosemirror-schema';
import Service from '../Service';
import './oenContainers.css';

class OenContainersService extends Service {
  name = 'OenContainersService';

  boot() {}

  register() {
    const createNode = this.container.get('CreateNode');

    createNode({
      oen_container: OenContainerNode,
    });
  }
}

export default OenContainersService;
