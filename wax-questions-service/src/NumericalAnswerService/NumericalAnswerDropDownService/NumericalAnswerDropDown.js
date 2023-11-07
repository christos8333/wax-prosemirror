import React from 'react';
import { injectable } from 'inversify';
import { isEmpty } from 'lodash';
import { Tools } from 'wax-prosemirror-core';
import NumericalAnswerDropDownCompontent from '../components/NumericalAnswerDropDownCompontent';

@injectable()
class NumericalAnswerDropDown extends Tools {
  title = 'Select Numerical Answer Option';
  icon = '';
  name = 'Select Numerical Answer';
  label = 'Select Numerical Answer';

  get run() {
    return (state, dispatch) => {};
  }

  select = (state, activeViewId, activeView) => {
    if (activeView.props.type && activeView.props.type === 'filltheGapContaier')
      return true;

    return false;
  };

  renderTool(view) {
    if (isEmpty(view)) return null;
    return this.isDisplayed() ? (
      <NumericalAnswerDropDownCompontent
        item={this.toJSON()}
        key="numerical-answer-options"
        view={view}
      />
    ) : null;
  }
}

export default NumericalAnswerDropDown;
