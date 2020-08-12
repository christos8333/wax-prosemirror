import Tools from '../../lib/Tools';
import { injectable } from 'inversify';
import { icons } from 'wax-prosemirror-components';

export default
@injectable()
class Save extends Tools {
  title = 'Save changes';
  content = icons.save;
  name = 'Save';

  get run() {}

  get enable() {}
}
