import Service from '../../Service';
import TableDropDownOptions from './TableDropDownOptions';

class EditTableService extends Service {
  boot() {}

  register() {
    this.container.bind('TableDropDownOptions').to(TableDropDownOptions);
  }
}

export default EditTableService;
