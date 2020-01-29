import authorTrackNode from "./authorTrackNode";
import titleTrackNode from "./titleTrackNode";
import subTitleTrackNode from "./subTitleTrackNode";
import epigraphProseTrackNode from "./epigraphProseTrackNode";
import epigraphPoetryTrackNode from "./epigraphPoetryTrackNode";
import headingTrackNode from "./headingTrackNode";
import paragraphContTrackNode from "./paragraphContTrackNode";
import extractProseTrackNode from "./extractProseTrackNode";
import extractPoetryTrackNode from "./extractPoetryTrackNode";
import sourceNoteTrackNode from "./sourceNoteTrackNode";
import bulletListTrackNode from "./bulletListTrackNode";
import orderedListTrackNode from "./orderedListTrackNode";
import listItemTrackNode from "./listItemTrackNode";
import imageTrackNode from "./imageTrackNode";

export default {
  author: authorTrackNode,
  title: titleTrackNode,
  subtitle: subTitleTrackNode,
  epigraphProse: epigraphProseTrackNode,
  epigraphPoetry: epigraphPoetryTrackNode,
  paragraphCont: paragraphContTrackNode,
  extractProse: extractProseTrackNode,
  extractPoetry: extractPoetryTrackNode,
  sourceNote: sourceNoteTrackNode
  // heading: headingTrackNode,
  // bulletlist: bulletListTrackNode,
  // orderedlist: orderedListTrackNode,
  // list_item: listItemTrackNode,
  // image: imageTrackNode
};
