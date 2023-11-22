import EnableTrackChangeService from './EnableTrackChangeService/EnableTrackChangeService';
import AcceptTrackChangeService from './AcceptTrackChangeService/AcceptTrackChangeService';
import RejectTrackChangeService from './RejectTrackChangeService/RejectTrackChangeService';
import ShowHideTrackChangeService from './ShowHideTrackChangeService/ShowHideTrackChangeService';
import TrackingAndEditingToolGroupService from './TrackingAndEditingToolGroupService/TrackingAndEditingToolGroupService';
import TrackOptionsToolGroupService from './TrackOptionsToolGroupService/TrackOptionsToolGroupService';
import TrackCommentOptionsToolGroupService from './TrackCommentOptionsToolGroupService/TrackCommentOptionsToolGroupService';

export default [
  new EnableTrackChangeService(),
  new AcceptTrackChangeService(),
  new RejectTrackChangeService(),
  new ShowHideTrackChangeService(),
  new TrackingAndEditingToolGroupService(),
  new TrackOptionsToolGroupService(),
  new TrackCommentOptionsToolGroupService(),
];
