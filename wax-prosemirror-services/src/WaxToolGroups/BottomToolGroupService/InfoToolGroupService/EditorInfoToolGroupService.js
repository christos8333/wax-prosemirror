import Service from '../../../Service';
// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import InfoToolGroup from './InfoTool';

class EditorInfoToolGroupServices extends Service {
    name = "EditorInfoToolGroupServices";
    register(){
        this.container.bind('InfoToolGroup').to(InfoToolGroup);
    }
}
export default EditorInfoToolGroupServices;