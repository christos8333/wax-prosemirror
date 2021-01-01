import Service from '../../../Service';
// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import ShortcutToolGroup from './ShortcutTool';

class ShortcutToolGroupServices extends Service {
    name = "ShortcutToolGroupServices";
    register(){
        this.container.bind('ShortcutToolGroup').to(ShortcutToolGroup);
    }
}
export default ShortcutToolGroupServices;