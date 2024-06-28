import ExtractPoetryService from './ExtractPoetryService/ExtractPoetryService';
import ExtractProseService from './ExtractProseService/ExtractProseService';
import ParagraphContinuedService from './ParagraphContinuedService/ParagraphContinuedService';
import ParagraphService from './ParagraphService/ParagraphService';
import SourceNoteService from './SourceNoteService/SourceNoteService';
// import BlockQuoteService from './BlockQuoteService/BlockQuoteService';
import TextToolGroupService from './TextToolGroupService/TextToolGroupService';

export default [
  new ExtractPoetryService(),
  new ExtractProseService(),
  new ParagraphContinuedService(),
  new ParagraphService(),
  new SourceNoteService(),
  // new BlockQuoteService(),
  new TextToolGroupService(),
];
