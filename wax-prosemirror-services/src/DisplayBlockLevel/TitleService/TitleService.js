import { Service } from 'wax-prosemirror-core';
import titleNode from './schema/titleNode';
import Title from './Title';

class TitleService extends Service {
  register() {
    this.container.bind('Title').toDynamicValue(() => {
      return new Title(this.config);
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
