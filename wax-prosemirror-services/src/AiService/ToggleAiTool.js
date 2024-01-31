import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Tools } from 'wax-prosemirror-core';
import ToggleAiComponent from './components/ToggleAiComponent';

class ToggleAiTool extends Tools {
  title = 'Toggle Ai';
  icon = 'ai';
  name = 'ToggleAi';

  renderTool(view) {
    return (
      <ToggleAiComponent
        displayed={false}
        item={this.toJSON()}
        key={uuidv4()}
        view={view}
      />
    );
  }
}

export default ToggleAiTool;
