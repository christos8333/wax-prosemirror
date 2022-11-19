import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { isEmpty } from 'lodash';
import { injectable } from 'inversify';
import { Tools } from 'wax-prosemirror-core';
import OENAsideButton from './components/OENAsideButton';

@injectable()
export default class OENAsideShortToolNote extends Tools {
  title = 'Note';
  label = 'Note';
  name = 'OENAsideShortToolNote';

  select = (state, activeViewId) => {
    if (activeViewId !== 'main') return false;
    return true;
  };

  get enable() {
    return state => {
      return true;
    };
  }

  get active() {
    return state => {
      const { from, to } = state.selection;
      let active = false;
      state.doc.nodesBetween(from, to, node => {
        if (node.type.name === 'oen_aside') {
          if (node.attrs.class.includes('note')) active = true;
        }
      });
      return active;
    };
  }

  renderTool(view) {
    if (isEmpty(view)) return null;

    return (
      <OENAsideButton
        item={this.toJSON()}
        key={uuidv4()}
        type="short note"
        view={view}
      />
    );
  }
}
