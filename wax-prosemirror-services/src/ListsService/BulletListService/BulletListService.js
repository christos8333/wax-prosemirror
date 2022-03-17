import { bulletListNode } from 'wax-prosemirror-schema';
import Service from '../../Service';
import BulletList from './BulletList';

class BulletListService extends Service {
  name = 'BulletListService';

  register() {
    const CreateShortCut = this.container.get('CreateShortCut');
    const createNode = this.container.get('CreateNode');

    this.container.bind('BulletList').toDynamicValue(() => {
      return new BulletList(this.config);
    });

    createNode(
      {
        bulletlist: bulletListNode,
      },
      { toWaxSchema: true },
    );

    CreateShortCut({
      'Shift-Ctrl-8': (state, dispatch) => {
        this.container.get('BulletList').run(state, dispatch);
      },
    });
  }
}

export default BulletListService;
