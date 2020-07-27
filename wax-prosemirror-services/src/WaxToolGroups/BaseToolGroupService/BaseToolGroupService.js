import Service from '../../Service';
import Base from './Base';

class BaseToolGroupService extends Service {
  register() {
    this.container.bind('Base').to(Base);
  }
}

export default BaseToolGroupService;
