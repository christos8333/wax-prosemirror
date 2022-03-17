import { toggleMark } from 'prosemirror-commands';
import { strongMark } from 'wax-prosemirror-schema';
import Service from '../../Service';
import Strong from './Strong';
import './strong.css';

class StrongService extends Service {
  register() {
    this.container.bind('Strong').to(Strong);
    const createMark = this.container.get('CreateMark');
    const CreateShortCut = this.container.get('CreateShortCut');

    createMark({
      strong: strongMark,
    });

    CreateShortCut({
      'Mod-b': toggleMark(this.schema.marks.strong),
    });
  }
}

export default StrongService;
