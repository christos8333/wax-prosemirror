import { Service } from 'wax-prosemirror-core';
import QuestionsDropDown from './QuestionsDropDown';

class QuestionsDropDownToolGroupService extends Service {
  register() {
    this.container.bind('QuestionsDropDown').to(QuestionsDropDown);
  }
}

export default QuestionsDropDownToolGroupService;
