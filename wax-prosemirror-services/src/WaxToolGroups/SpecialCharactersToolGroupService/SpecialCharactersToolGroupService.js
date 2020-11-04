/* eslint-disable */
import Service from '../../Service';
import SpecialCharacters from './SpecialCharacters';

class SpecialCharactersToolGroupService extends Service {
  register() {
    this.container.bind('SpecialCharacters').to(SpecialCharacters);
  }
}

export default SpecialCharactersToolGroupService;
