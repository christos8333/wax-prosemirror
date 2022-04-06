import Service from '../../Service';
import MultipleDropDown from './MultipleDropDown';

class MultipleDropDownToolGroupService extends Service {
  register() {
    this.container.bind('MultipleDropDown').to(MultipleDropDown);
  }
}

export default MultipleDropDownToolGroupService;
