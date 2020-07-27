import { codeBlockNode } from 'wax-prosemirror-schema';
import Service from '../Service';
import CodeBlockTool from './CodeBlockTool';

export default class CodeBlockService extends Service {
  boot() {}

  register() {
    this.container.bind('CodeBlock').to(CodeBlockTool);
    const createNode = this.container.get('CreateNode');

    createNode({
      codeblock: codeBlockNode,
    });
  }
}
