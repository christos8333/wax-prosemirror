import Service from '../../Service';
import { toggleMark } from 'prosemirror-commands';
import { strongMark } from 'wax-prosemirror-schema';
import Strong from './Strong';

class StrongService extends Service {
  boot() {
    const shortCuts = this.container.get('ShortCuts');
    shortCuts.addShortCut({ 'Mod-b': toggleMark(this.schema.marks.strong) });
  }

  register() {
    this.container.bind('Strong').to(Strong);
    const createMark = this.container.get('CreateMark');
    createMark({
      strong: strongMark,
    });
  }
}

export default StrongService;
