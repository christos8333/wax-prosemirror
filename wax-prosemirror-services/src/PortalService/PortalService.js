import Service from '../Service';
import PortalComponent from './components/PortalComponent';

class PortalService extends Service {
  boot() {}

  register() {
    const layout = this.container.get('Layout');
    layout.addComponent('waxPortals', PortalComponent);
    // this.container.bind('MultipleChoiceQuestion').to(MultipleChoiceQuestion);
    // const createNode = this.container.get('CreateNode');
    // createNode({
    //   multiple_choice: multipleChoiceNode,
    // });
    // console.log(this.schema);
  }
}

export default PortalService;
