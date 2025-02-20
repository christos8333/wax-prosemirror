import CustomTagBlockService from './CustomTagBlockService/CustomTagBlockService';
import CustomTagBlockNewService from './CustomTagBlockNewService/CustomTagBlockNewService';
import CustomTagInlineService from './CustomTagInlineService/CustomTagInlineService';
import CustomTagBlockToolGroupService from './CustomTagToolGroupService/CustomTagBlockToolGroupService/CustomTagBlockToolGroupService';
import CustomTagInlineToolGroupService from './CustomTagToolGroupService/CustomTagInlineToolGroupService/CustomTagInlineToolGroupService';
import CustomTagBlockNewToolGroupService from './CustomTagToolGroupService/CustomTagBlockNewToolGroupService/CustomTagBlockNewToolGroupService';

export default [
  new CustomTagBlockNewService(),
  new CustomTagBlockService(),
  new CustomTagInlineService(),
  new CustomTagBlockToolGroupService(),
  new CustomTagInlineToolGroupService(),
  new CustomTagBlockNewToolGroupService(),
];
