import { listItemNode } from 'wax-prosemirror-schema';
import Service from '../../Service';

class ListItemService extends Service {
  register() {
    const createNode = this.container.get('CreateNode');
    createNode(
      {
        list_item: listItemNode,
      },
      { toWaxSchema: true },
    );
  }
}

export default ListItemService;
