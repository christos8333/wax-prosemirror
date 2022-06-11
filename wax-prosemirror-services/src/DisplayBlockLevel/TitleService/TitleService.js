import { titleNode } from 'wax-prosemirror-schema';
import Service from '../../Service';
import Title from './Title';

class TitleService extends Service {
  register() {
    this.container.bind('Title').toDynamicValue(() => {
      return new Title(this.config.get('config.OENContainersService'));
    });
    const createNode = this.container.get('CreateNode');
    createNode(
      {
        title: titleNode,
      },
      { toWaxSchema: true },
    );
  }
}

export default TitleService;
