import Service from '../../Service'
import HelpTool from './HelpTool';

export default class HelpService extends Service {
    register() {
        this.container.bind('HelpTool').to(HelpTool);
    }
}
