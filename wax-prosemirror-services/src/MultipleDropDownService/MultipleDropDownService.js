import Service from '../Service';
import MultipleDropDownQuestion from './MultipleDropDownQuestion';
import MultipleDropDownContainerNodeView from './MultipleDropDownContainerNodeView';

class MultipleDropDownService extends Service {
  name = 'MultipleDropDownService';

  register() {
    this.container
      .bind('MultipleDropDownQuestion')
      .to(MultipleDropDownQuestion);
    const createNode = this.container.get('CreateNode');
    const addPortal = this.container.get('AddPortal');
  }
}

export default MultipleDropDownService;
