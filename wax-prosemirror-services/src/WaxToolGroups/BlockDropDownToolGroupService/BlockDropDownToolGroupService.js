import Service from '../../Service';
import BlockDropDown from './BlockDropDown';

class BlockDropDownToolGroupService extends Service {
  register() {
    this.container.bind('BlockDropDown').to(BlockDropDown);
  }
}

export default BlockDropDownToolGroupService;
