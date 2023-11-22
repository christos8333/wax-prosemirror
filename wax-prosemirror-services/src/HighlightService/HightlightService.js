import { Service } from 'wax-prosemirror-core';
import highlightMark from './schema/highlightMark';
import TextHighlightTool from './TextHighlightTool';
import TextHighlightToolGroupServices from './TextHighlightToolGroupService/TextHighlightToolGroupService';

export default class HighlightService extends Service {
  register() {
    this.container.bind('TextHighlightTool').to(TextHighlightTool);
    const createMark = this.container.get('CreateMark');
    createMark(
      {
        highlight: highlightMark,
      },
      { toWaxSchema: true },
    );
  }

  dependencies = [new TextHighlightToolGroupServices()];
}
