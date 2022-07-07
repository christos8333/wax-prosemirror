import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { isEmpty } from 'lodash';
import { injectable } from 'inversify';
import { OENAsideButton } from 'wax-prosemirror-components';
import Tools from '../lib/Tools';

@injectable()
export default class OENAsideLongToolCaseStudy extends Tools {
  title = 'long';
  label = 'Case Study';
  name = 'OENAsideLongToolCaseStudy';

  get run() {
    return (state, dispatch, className) => {};
  }

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
      state.doc.nodesBetween(from, to, (node, pos) => {
        if (node.type.name === 'oen_aside') {
          if (node.attrs.class.includes('case-study')) active = true;
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
        type="long case-study"
        view={view}
      />
    );
  }
}
