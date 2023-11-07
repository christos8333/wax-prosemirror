import { Service } from 'wax-prosemirror-core';
import NumericalAnswerDropDown from './NumericalAnswerDropDown';
import NumericalAnswerToolGroupService from '../NumericalAnswerToolGroupService/NumericalAnswerToolGroupService';

class NumericalAnswerDropDownService extends Service {
  register() {
    this.container.bind('NumericalAnswerDropDown').to(NumericalAnswerDropDown);
  }

  dependencies = [new NumericalAnswerToolGroupService()];
}

export default NumericalAnswerDropDownService;
