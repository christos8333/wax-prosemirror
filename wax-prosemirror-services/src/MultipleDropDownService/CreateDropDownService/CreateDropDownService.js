import Service from '../../Service';
import CreateDropDown from './CreateDropDown';

class CreateDropDownService extends Service {
  register() {
    this.container.bind('CreateDropDown').to(CreateDropDown);
  }
}

export default CreateDropDownService;
