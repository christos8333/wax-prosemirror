import Service from '../../Service';
import CodeBlock from './CodeBlock';

class CodeBlockToolGroupService extends Service {
  register() {
    this.container.bind('CodeBlock').to(CodeBlock);
  }
}

export default CodeBlockToolGroupService;
