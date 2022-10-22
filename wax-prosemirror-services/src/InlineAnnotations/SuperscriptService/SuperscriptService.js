import { Service } from 'wax-prosemirror-core';
import superscriptMark from './schema/superscriptMark';
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
