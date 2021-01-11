import Service from '../Service';
import EditingSuggesting from './EditingSuggesting';

class EditingSuggestingService extends Service {
  name = 'EditingSuggestingService';

  register() {
    this.container.bind('EditingSuggesting').to(EditingSuggesting);
  }
}
export default EditingSuggestingService;
