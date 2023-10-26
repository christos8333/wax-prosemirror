import { Service } from 'wax-prosemirror-core';
import NumericalAnswerContainerNode from './schema/NumericalAnswerContainerNode';

import './numericalAnswer.css';

class NumericalAnswerService extends Service {
  register() {
    this.container.bind('').to();
    const createNode = this.container.get('CreateNode');
    const addPortal = this.container.get('AddPortal');
  }

  dependencies = [];
}

export default NumericalAnswerService;
