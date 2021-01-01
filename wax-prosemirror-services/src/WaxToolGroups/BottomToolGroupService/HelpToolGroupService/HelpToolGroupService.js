import Service from '../../../Service';
// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import HelpToolGroup from './HelpTool';

class HelpToolGroupServices extends Service {
    name = "HelpToolGroupServices";
    register(){
        this.container.bind('HelpToolGroup').to(HelpToolGroup);
    }
}
export default HelpToolGroupServices;