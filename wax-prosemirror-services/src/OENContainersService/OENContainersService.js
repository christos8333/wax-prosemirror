import { OenContainerNode } from 'wax-prosemirror-schema';
import Service from '../Service';
import './oenContainers.css';

class OENContainersService extends Service {
  name = 'OENContainersService';

  boot() {}

  register() {
    const createNode = this.container.get('CreateNode');

    createNode({
      oen_container: OenContainerNode,
    });
  }
}

export default OENContainersService;
