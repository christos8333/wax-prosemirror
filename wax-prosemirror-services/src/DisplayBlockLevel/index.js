import AuthorService from './AuthorService/AuthorService';
import EpigraphPoetryService from './EpigraphPoetryService/EpigraphPoetryService';
import EpigraphProseService from './EpigraphProseService/EpigraphProseService';
import HeadingService from './HeadingService/HeadingService';
import SubTitleService from './SubTitleService/SubTitleService';
import TitleService from './TitleService/TitleService';
import DisplayToolGroupService from './DisplayToolGroupService/DisplayToolGroupService';

export default [
  new AuthorService(),
  new EpigraphProseService(),
  new EpigraphPoetryService(),
  new HeadingService(),
  new SubTitleService(),
  new TitleService(),
  new DisplayToolGroupService(),
];
