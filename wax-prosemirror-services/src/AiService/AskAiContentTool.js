import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { injectable } from 'inversify';
import { Commands, Tools } from 'wax-prosemirror-core';
import AskAiComponent from './components/AskAiComponent';

@injectable()
class AskAiContentTool extends Tools {
  title = 'ChatGPT';
  name = 'ChatGPT';
  label = '';

  get run() {
    return true;
  }

  get enable() {
    return state => {
      return Commands.isOnSameTextBlock(state);
    };
  }

  select = state => {
    return Commands.isOnSameTextBlock(state);
  };

  renderTool(view) {
    return (
      <AskAiComponent
        config={this.config}
        displayed={this.isDisplayed()}
        item={this}
        key={uuidv4()}
        pmplugins={this.pmplugins}
        view={view}
      />
    );
  }
}

export default AskAiContentTool;
