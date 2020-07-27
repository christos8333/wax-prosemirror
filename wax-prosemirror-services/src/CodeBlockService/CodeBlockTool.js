import Tools from '../lib/Tools';
import { injectable } from 'inversify';
import { icons } from 'wax-prosemirror-components';
import { Fragment } from 'prosemirror-model';

@injectable()
class CodeBlockTool extends Tools {
  title = 'Insert Code Block';
  content = icons.footnote;

  get run() {}

  get enable() {}
}

export default CodeBlockTool;
