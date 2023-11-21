import { Service } from 'wax-prosemirror-core';
import codeBlockNode from './schema/codeBlockNode';
import highlightPlugin from './plugins/highlightPlugin';
import CodeBlockTool from './CodeBlockTool';
import CodeBlockToolGroupService from './CodeBlockToolGroupService/CodeBlockToolGroupService';
import './highlightStyles.css';

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

  dependencies = [new CodeBlockToolGroupService()];
}
