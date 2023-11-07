import { injectable } from 'inversify';
import { Fragment } from 'prosemirror-model';
import { v4 as uuidv4 } from 'uuid';
import { Tools } from 'wax-prosemirror-core';

@injectable()
class NumericalAnswerDropDown extends Tools {
  title = 'Select Numerical Answer Option';
  icon = '';
  name = 'Select Numerical Answer';
  label = 'Select Numerical Answer';

  get run() {}

  select = (state, activeViewId, activeView) => {
    if (activeView.props.type && activeView.props.type === 'filltheGapContaier')
      return true;

    return false;
  };
}

export default NumericalAnswerDropDown;
