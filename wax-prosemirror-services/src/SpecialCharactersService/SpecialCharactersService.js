import { Service } from 'wax-prosemirror-core';
import SpecialCharactersTool from './SpecialCharactersTool';
import SpecialCharactersToolGroupService from './SpecialCharactersToolGroupService/SpecialCharactersToolGroupService';

class SpecialCharactersService extends Service {
  name = 'SpecialCharactersService';

  register() {
    this.container.bind('SpecialCharactersTool').to(SpecialCharactersTool);
  }

  dependencies = [new SpecialCharactersToolGroupService()];
}
export default SpecialCharactersService;
