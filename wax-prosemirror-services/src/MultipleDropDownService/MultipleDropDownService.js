import Service from '../Service';
import MultipleDropDownQuestion from './MultipleDropDownQuestion';
import MultipleDropDownContainerNodeView from './MultipleDropDownContainerNodeView';
import multipleDropDownContainerNode from './schema/multipleDropDownContainerNode';
import CreateDropDownService from './CreateDropDownService/CreateDropDownService';
import MultipleDropDownContainerComponent from './components/MultipleDropDownContainerComponent';

class MultipleDropDownService extends Service {
  name = 'MultipleDropDownService';

  register() {
    this.container
      .bind('MultipleDropDownQuestion')
      .to(MultipleDropDownQuestion);
    const createNode = this.container.get('CreateNode');
    const addPortal = this.container.get('AddPortal');

    createNode({
      multiple_drop_down_container: multipleDropDownContainerNode,
    });

    addPortal({
      nodeView: MultipleDropDownContainerNodeView,
      component: MultipleDropDownContainerComponent,
      context: this.app,
    });
  }

  dependencies = [new CreateDropDownService()];
}

export default MultipleDropDownService;
