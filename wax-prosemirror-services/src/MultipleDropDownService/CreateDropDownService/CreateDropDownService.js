import Service from '../../Service';
import CreateDropDown from './CreateDropDown';
import multipleDropDownOptionNode from '../schema/multipleDropDownOptionNode';
import MultipleDropDownNodeView from './MultipleDropDownNodeView';
import MultipleDropDownComponent from '../components/MultipleDropDownComponent';

class CreateDropDownService extends Service {
  register() {
    const createNode = this.container.get('CreateNode');
    const addPortal = this.container.get('AddPortal');

    this.container.bind('CreateDropDown').to(CreateDropDown);

    createNode({
      multiple_drop_down_option: multipleDropDownOptionNode,
    });

    addPortal({
      nodeView: MultipleDropDownNodeView,
      component: MultipleDropDownComponent,
      context: this.app,
    });
  }
}

export default CreateDropDownService;
