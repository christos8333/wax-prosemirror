import { wrapInList } from 'prosemirror-schema-list';
import { orderedListNode } from 'wax-prosemirror-schema';
import Service from '../../Service';
import OrderedList from './OrderedList';

class OrderedListService extends Service {
  name = 'OrderedListService';
  boot() {
    const shortCuts = this.container.get('ShortCuts');
    shortCuts.addShortCut({
      'Shift-Ctrl-9': wrapInList(this.schema.nodes.orderedlist),
    });
  }

  register() {
    this.container.bind('OrderedList').toDynamicValue(() => {
      return new OrderedList(this.config);
    });
    const createNode = this.container.get('CreateNode');
    createNode(
      {
        orderedlist: orderedListNode,
      },
      { toWaxSchema: true },
    );
  }
}

export default OrderedListService;
