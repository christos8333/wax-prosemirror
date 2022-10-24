import { Service } from 'wax-prosemirror-core';
import { toggleMark } from 'prosemirror-commands';
import emphasisMark from './schema/emphasisMark';
import Emphasis from './Emphasis';

class EmphasisService extends Service {
  register() {
    this.container.bind('Emphasis').to(Emphasis);
    const createMark = this.container.get('CreateMark');
    const CreateShortCut = this.container.get('CreateShortCut');

    createMark(
      {
        em: emphasisMark,
      },
      { toWaxSchema: true },
    );

    CreateShortCut({
      'Mod-i': toggleMark(this.schema.marks.em),
    });
  }
}

export default EmphasisService;
