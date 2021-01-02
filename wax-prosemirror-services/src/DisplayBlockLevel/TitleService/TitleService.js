import { titleNode } from 'wax-prosemirror-schema';
import Service from '../../Service';
import Title from './Title';

class TitleService extends Service {
  name = 'TitleService';

  register() {
    this.container.bind('Title').to(Title);
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
