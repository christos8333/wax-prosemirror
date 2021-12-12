import Service from '../Service';
import EssayQuestion from './EssayQuestion';
import essayNode from './schema/essayNode';
import EssayComponent from './components/EssayComponent';
import EssayNodeView from './EssayNodeView';

class EssayService extends Service {
  register() {
    this.container.bind('EssayQuestion').to(EssayQuestion);
    const createNode = this.container.get('CreateNode');
    const addPortal = this.container.get('AddPortal');

    createNode({
      essay: essayNode,
    });

    addPortal({
      nodeView: EssayNodeView,
      component: EssayComponent,
      context: this.app,
    });
  }
}

export default EssayService;
