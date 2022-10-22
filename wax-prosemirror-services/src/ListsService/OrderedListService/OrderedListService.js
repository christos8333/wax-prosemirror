import { Service } from 'wax-prosemirror-core';
import orderedListNode from './schema/orderedListNode';
import OrderedList from './OrderedList';

class OrderedListService extends Service {
  name = 'OrderedListService';

  register() {
    const CreateShortCut = this.container.get('CreateShortCut');
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
    CreateShortCut({
      'Shift-Ctrl-9': (state, dispatch) => {
        this.container.get('OrderedList').run(state, dispatch);
      },
    });
  }
}

export default OrderedListService;
