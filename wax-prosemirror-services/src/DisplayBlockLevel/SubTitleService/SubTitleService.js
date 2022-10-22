import { Service } from 'wax-prosemirror-core';
import subTitleNode from './schema/subTitleNode';
import SubTitle from './SubTitle';

class SubTitleService extends Service {
  register() {
    this.container.bind('SubTitle').to(SubTitle);
    const createNode = this.container.get('CreateNode');
    createNode(
      {
        subtitle: subTitleNode,
      },
      { toWaxSchema: true },
    );
  }
}

export default SubTitleService;
