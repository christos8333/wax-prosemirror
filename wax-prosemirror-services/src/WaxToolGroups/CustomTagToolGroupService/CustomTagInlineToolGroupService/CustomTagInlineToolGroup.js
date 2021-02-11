import {injectable, inject} from 'inversify';
import ToolGroup from '../../../lib/ToolGroup';

@injectable()
class CustomTagInlineToolGroup extends ToolGroup {
    tools = [];

    constructor(@inject('CustomTagInlineTool') customTagInline) {
        super();
        this.tools = [customTagInline];
    }
}

export default CustomTagInlineToolGroup;