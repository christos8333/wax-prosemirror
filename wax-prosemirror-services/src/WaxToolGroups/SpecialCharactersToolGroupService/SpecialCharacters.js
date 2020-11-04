import { injectable, inject } from 'inversify';
import ToolGroup from '../../lib/ToolGroup';

@injectable()
class SpecialCharacters extends ToolGroup {
  tools = [];
  constructor(@inject('SpecialCharactersTool') specialCharactersTool) {
    super();
    this.tools = [specialCharactersTool];
  }
}

export default SpecialCharacters;
