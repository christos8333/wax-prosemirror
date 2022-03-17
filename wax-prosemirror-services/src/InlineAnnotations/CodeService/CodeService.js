import { toggleMark } from 'prosemirror-commands';
import { codeMark } from 'wax-prosemirror-schema';
import Code from './Code';
import Service from '../../Service';

class CodeService extends Service {
  register() {
    this.container.bind('Code').to(Code);
    const CreateShortCut = this.container.get('CreateShortCut');

    const createMark = this.container.get('CreateMark');
    createMark(
      {
        code: codeMark,
      },
      { toWaxSchema: true },
    );

    CreateShortCut({
      'Mod-`': toggleMark(this.schema.marks.code),
    });
  }
}

export default CodeService;
