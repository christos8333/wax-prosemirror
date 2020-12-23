import { injectable } from 'inversify';
// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import Tools from '../../lib/Tools';

@injectable()
class ShortcutTool extends Tools {
  title = 'Shortcut';
  icon = 'fullScreen';
  name = 'Shortcut';

  get run() {
    return () => true;
  }

}

export default ShortcutTool;