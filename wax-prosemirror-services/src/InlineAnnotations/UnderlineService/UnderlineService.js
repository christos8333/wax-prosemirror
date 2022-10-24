import { Service } from 'wax-prosemirror-core';
import { toggleMark } from 'prosemirror-commands';
import underlineMark from './schema/underlineMark';
import Underline from './Underline';

class UnderlineService extends Service {
  register() {
    this.container.bind('Underline').to(Underline);
    const CreateShortCut = this.container.get('CreateShortCut');
    const createMark = this.container.get('CreateMark');
    createMark(
      {
        underline: underlineMark,
      },
      { toWaxSchema: true },
    );
    CreateShortCut({
      'Mod-u': toggleMark(this.schema.marks.underline),
    });
  }
}

export default UnderlineService;
