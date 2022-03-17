import { liftListItem, sinkListItem } from 'prosemirror-schema-list';
import Service from '../../Service';
import Lift from './Lift';

class LiftService extends Service {
  register() {
    this.container.bind('Lift').to(Lift);
    const CreateShortCut = this.container.get('CreateShortCut');
    CreateShortCut({
      'Mod-[': (state, dispatch) =>
        liftListItem(state.schema.nodes.list_item)(state, dispatch),
    });
    CreateShortCut({
      'Mod-]': (state, dispatch) =>
        sinkListItem(state.schema.nodes.list_item)(state, dispatch),
    });
  }
}

export default LiftService;
