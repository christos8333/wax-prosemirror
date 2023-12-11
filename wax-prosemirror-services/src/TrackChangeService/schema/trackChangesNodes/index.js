import authorTrackNode from './authorTrackNode';
import titleTrackNode from './titleTrackNode';
import subTitleTrackNode from './subTitleTrackNode';
import epigraphProseTrackNode from './epigraphProseTrackNode';
import epigraphPoetryTrackNode from './epigraphPoetryTrackNode';
import heading2TrackNode from './heading2TrackNode';
import heading3TrackNode from './heading3TrackNode';
import heading4TrackNode from './heading4TrackNode';
import heading5TrackNode from './heading5TrackNode';
import heading6TrackNode from './heading6TrackNode';
import paragraphContTrackNode from './paragraphContTrackNode';
import extractProseTrackNode from './extractProseTrackNode';
import extractPoetryTrackNode from './extractPoetryTrackNode';
import sourceNoteTrackNode from './sourceNoteTrackNode';
// import bulletListTrackNode from './bulletListTrackNode';
import orderedListTrackNode from './orderedListTrackNode';
// import listItemTrackNode from './listItemTrackNode';
// import imageTrackNode from './imageTrackNode';
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
  heading2: heading2TrackNode,
  heading3: heading3TrackNode,
  heading4: heading4TrackNode,
  heading5: heading5TrackNode,
  heading6: heading6TrackNode,
  customTagBlock: customBlockTrackNode,
  // bulletlist: bulletListTrackNode,
  // list_item: listItemTrackNode,
  // image: imageTrackNode
};
