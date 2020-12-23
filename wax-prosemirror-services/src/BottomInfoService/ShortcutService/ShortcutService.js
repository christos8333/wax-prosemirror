import Service from '../../Service'
import ShortcutTool from './ShortcutTool';

export default class ShortcutService extends Service {
    register() {
        this.container.bind('ShortcutTool').to(ShortcutTool);
    }
}
