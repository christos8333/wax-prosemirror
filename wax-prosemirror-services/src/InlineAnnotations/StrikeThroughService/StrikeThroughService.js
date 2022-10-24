import { Service } from 'wax-prosemirror-core';
import strikethroughMark from './schema/strikethroughMark';
import StrikeThrough from './StrikeThrough';

class StrikeThroughService extends Service {
  register() {
    this.container.bind('StrikeThrough').to(StrikeThrough);
    const createMark = this.container.get('CreateMark');
    createMark(
      {
        strikethrough: strikethroughMark,
      },
      { toWaxSchema: true },
    );
  }
}

export default StrikeThroughService;
