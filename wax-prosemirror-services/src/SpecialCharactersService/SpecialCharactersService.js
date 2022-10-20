import { Service } from 'wax-prosemirror-core';
import SpecialCharactersTool from './SpecialCharactersTool';

class SpecialCharactersService extends Service {
  name = 'SpecialCharactersService';

  register() {
    this.container.bind('SpecialCharactersTool').to(SpecialCharactersTool);
  }
}
export default SpecialCharactersService;
