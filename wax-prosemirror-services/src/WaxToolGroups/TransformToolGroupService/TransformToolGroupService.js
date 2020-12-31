import Service from '../../Service';
// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import TransformToolGroup from './TransformToolGroup';

class TransformToolGroupService extends Service {
    register() {
        this.container.bind('TransformToolGroup').to(TransformToolGroup);
    }
}

export default TransformToolGroupService;