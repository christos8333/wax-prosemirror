import Service from '../../Service';
import CreateDropDown from './CreateDropDown';
import multipleDropDownOptionNode from '../schema/multipleDropDownOptionNode';
import MultipleDropDownNodeView from './MultipleDropDownNodeView';
import MultipleDropDownComponent from '../components/MultipleDropDownComponent';
import DropDownComponent from '../components/DropDownComponent';

class CreateDropDownService extends Service {
  name = 'CreateDropDownService';

  boot() {
    const createOverlay = this.container.get('CreateOverlay');
    createOverlay(
      DropDownComponent,
      {},
      {
        markType: 'multiple_drop_down_option',
        followCursor: true,
        selection: false,
      },
    );
  }

  register() {
    const CreateMark = this.container.get('CreateMark');
    const addPortal = this.container.get('AddPortal');
    this.container.bind('CreateDropDown').to(CreateDropDown);

    CreateMark({
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
