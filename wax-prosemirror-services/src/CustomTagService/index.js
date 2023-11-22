import CustomTagBlockService from './CustomTagBlockService/CustomTagBlockService';
import CustomTagInlineService from './CustomTagInlineService/CustomTagInlineService';
import CustomTagBlockToolGroupService from './CustomTagToolGroupService/CustomTagBlockToolGroupService/CustomTagBlockToolGroupService';
import CustomTagInlineToolGroupService from './CustomTagToolGroupService/CustomTagInlineToolGroupService/CustomTagInlineToolGroupService';

export default [
  new CustomTagBlockService(),
  new CustomTagInlineService(),
  new CustomTagBlockToolGroupService(),
  new CustomTagInlineToolGroupService(),
];
