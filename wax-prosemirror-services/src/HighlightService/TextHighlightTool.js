import { Commands } from 'wax-prosemirror-utilities';

import { injectable } from 'inversify';
import { deleteSelection,toggleMark } from 'prosemirror-commands';
import { TextHighlightingTool } from 'wax-prosemirror-components'
import { isEmpty } from 'lodash';
import { render } from 'react-dom';
import React from 'react';
import Tools from '../lib/Tools';
import { v4 as uuidv4 } from 'uuid';

@injectable()
class TextHighlightTool extends Tools {

    title ='Text Highlighter';
    icon ='highlight';
    name ='TextHighlightTool';

    select = (state, activeViewId,activeView) => {
    //  return !activeView.state.selection.empty;
    return window.getSelection().toString().trim().length == 0 ? false :true;
    };

    get run() {
        return (state, dispatch,color) => {
          const {
            selection: { $from, $to },
          } = state;
          color == "background-color: transparent;" ? dispatch(state.tr.removeMark($from.pos,$to.pos,state.schema.marks.highlight)) :  dispatch(state.tr.addMark($from.pos,$to.pos,state.schema.marks.highlight.create({ style: color })));

        };
    }

    renderTool(view) {
      if (isEmpty(view)) return null;
      return this._isDisplayed ? (
      <TextHighlightingTool key={uuidv4()} item={this.toJSON()} view={view}  />
      ) : null;
    }
}

export default TextHighlightTool;