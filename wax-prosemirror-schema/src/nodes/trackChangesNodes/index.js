import authorTrackNode from './authorTrackNode';
import titleTrackNode from './titleTrackNode';
import subTitleTrackNode from './subTitleTrackNode';
import epigraphProseTrackNode from './epigraphProseTrackNode';
import epigraphPoetryTrackNode from './epigraphPoetryTrackNode';
import headingTrackNode from './headingTrackNode';
import paragraphContTrackNode from './paragraphContTrackNode';
import extractProseTrackNode from './extractProseTrackNode';
import extractPoetryTrackNode from './extractPoetryTrackNode';
import sourceNoteTrackNode from './sourceNoteTrackNode';
import bulletListTrackNode from './bulletListTrackNode';
import orderedListTrackNode from './orderedListTrackNode';
import listItemTrackNode from './listItemTrackNode';
import imageTrackNode from './imageTrackNode';
import customBlockTrackNode from './customBlockTrackNode';

export default {
  author: authorTrackNode,
  title: titleTrackNode,
  subtitle: subTitleTrackNode,
  epigraphProse: epigraphProseTrackNode,
  epigraphPoetry: epigraphPoetryTrackNode,
  paragraphCont: paragraphContTrackNode,
  extractProse: extractProseTrackNode,
  extractPoetry: extractPoetryTrackNode,
  orderedlist: orderedListTrackNode,
  sourceNote: sourceNoteTrackNode,
  heading: headingTrackNode,
  customTagBlock: customBlockTrackNode,
  // bulletlist: bulletListTrackNode,
  // list_item: listItemTrackNode,
  // image: imageTrackNode
};
