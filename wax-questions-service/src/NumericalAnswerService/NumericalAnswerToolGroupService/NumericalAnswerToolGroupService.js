import { Service } from 'wax-prosemirror-core';
import NumericalAnswer from './NumericalAnswer';

class NumericalAnswerToolGroupService extends Service {
  register() {
    this.container.bind('NumericalAnswer').to(NumericalAnswer);
  }
}

export default NumericalAnswerToolGroupService;
