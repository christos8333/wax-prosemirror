import { Service } from 'wax-prosemirror-core';
import MultipleChoiceDropDown from './MultipleChoiceDropDown';

class MultipleChoiceDropDownToolGroupService extends Service {
  register() {
    this.container.bind('MultipleChoiceDropDown').to(MultipleChoiceDropDown);
  }
}

export default MultipleChoiceDropDownToolGroupService;
