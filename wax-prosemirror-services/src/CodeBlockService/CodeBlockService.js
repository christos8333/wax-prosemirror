import { highlightPlugin } from 'wax-prosemirror-plugins';
import 'highlight.js/styles/github.css';

import { codeBlockNode } from 'wax-prosemirror-schema';
import Service from '../Service';
import CodeBlockTool from './CodeBlockTool';

export default class CodeBlockService extends Service {
  boot() {
    this.app.PmPlugins.add('highlightPlugin', highlightPlugin());
  }

  register() {
    this.container.bind('CodeBlockTool').to(CodeBlockTool);
    const createNode = this.container.get('CreateNode');

    createNode({
      code_block: codeBlockNode,
    });
  }
}
