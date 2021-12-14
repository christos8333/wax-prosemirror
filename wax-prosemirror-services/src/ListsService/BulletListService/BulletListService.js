// import { wrapInList } from 'prosemirror-schema-list';
import { bulletListNode } from 'wax-prosemirror-schema';
import Service from '../../Service';
import BulletList from './BulletList';

class BulletListService extends Service {
  name = 'BulletListService';
  boot() {
    const shortCuts = this.container.get('ShortCuts');
    // shortCuts.addShortCut({
    //   "Shift-Ctrl-8": wrapInList(this.schema.nodes.bulletlist)
    // });
  }

  register() {
    this.container.bind('BulletList').toDynamicValue(() => {
      return new BulletList(this.config);
    });
    const createNode = this.container.get('CreateNode');
    createNode(
      {
        bulletlist: bulletListNode,
      },
      { toWaxSchema: true },
    );
  }
}

export default BulletListService;
