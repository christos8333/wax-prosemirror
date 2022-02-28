import { superscriptMark } from 'wax-prosemirror-schema';
import Service from '../../Service';
import Superscript from './Superscript';
import './superscript.css';

class SuperscriptService extends Service {
  name = 'SuperscriptService';

  register() {
    this.container.bind('Superscript').to(Superscript);
    const createMark = this.container.get('CreateMark');
    createMark(
      {
        superscript: superscriptMark,
      },
      { toWaxSchema: true },
    );
  }
}

export default SuperscriptService;
