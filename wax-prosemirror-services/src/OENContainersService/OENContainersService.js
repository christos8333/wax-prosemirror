import { OenNodes } from 'wax-prosemirror-schema';
import Service from '../Service';
import './oenContainers.css';

class OENContainersService extends Service {
  name = 'OENContainersService';

  boot() {}

  register() {
    console.log(this.config);
    const createNode = this.container.get('CreateNode');

    Object.keys(OenNodes).forEach(node => {
      createNode({
        [node]: OenNodes[node],
      });
    });
  }
}

export default OENContainersService;
