import AuthorService from "./AuthorService/AuthorService";
import EpigraphPoetryService from "./EpigraphPoetryService/EpigraphPoetryService";
import EpigraphProseService from "./EpigraphProseService/EpigraphProseService";
import HeadingService from "./HeadingService/HeadingService";
import SubTitleService from "./SubTitleService/SubTitleService";
import TitleService from "./TitleService/TitleService";

export default [
  new AuthorService(),
  new EpigraphProseService(),
  new EpigraphPoetryService(),
  new HeadingService(),
  new SubTitleService(),
  new TitleService()
];
