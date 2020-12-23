import { injectable } from 'inversify';
// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import Tools from '../../lib/Tools';

@injectable()
class HelpTool extends Tools {
  title = 'Help';
  icon = 'help';
  name = 'HelpTool';

  get run() {
    return () => true;
  }
}

export default HelpTool;