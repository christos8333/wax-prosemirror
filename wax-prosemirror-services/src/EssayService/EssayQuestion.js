import React from 'react';
import { isEmpty } from 'lodash';
import { injectable } from 'inversify';
import { v4 as uuidv4 } from 'uuid';
import { Commands } from 'wax-prosemirror-utilities';
import ToolBarBtn from './components/ToolBarBtn';
import Tools from '../lib/Tools';

const checkifEmpty = view => {
  const { state } = view;
  const { from, to } = state.selection;
  state.doc.nodesBetween(from, to, (node, pos) => {
    if (node.textContent !== ' ') Commands.simulateKey(view, 13, 'Enter');
  });
  if (state.selection.constructor.name === 'GapCursor') {
    Commands.simulateKey(view, 13, 'Enter');
    setTimeout(() => {
      view.focus();
    });
  }
};

@injectable()
class EssayQuestion extends Tools {
  title = 'Add Essay Question';
  icon = '';
  name = 'Essay';
  label = 'Essay';

  get run() {
    return (main, dispatch) => {
      checkifEmpty(main);
      //const { state, dispatch } = main;
    };
  }

  get active() {
    return state => {};
  }

  select = (state, activeView) => {
    let status = true;
    const { from, to } = state.selection;

    if (from === null) return false;

    state.doc.nodesBetween(from, to, (node, pos) => {
      if (node.type.groups.includes('questions')) {
        status = false;
      }
    });
    return status;
  };

  get enable() {
    return state => {};
  }

  renderTool(view) {
    if (isEmpty(view)) return null;
    // eslint-disable-next-line no-underscore-dangle
    return this._isDisplayed ? (
      <ToolBarBtn item={this.toJSON()} key={uuidv4()} view={view} />
    ) : null;
  }
}

export default EssayQuestion;
