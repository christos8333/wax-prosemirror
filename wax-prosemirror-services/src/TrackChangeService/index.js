import EnableTrackChangeService from './EnableTrackChangeService/EnableTrackChangeService';
import AcceptTrackChangeService from './AcceptTrackChangeService/AcceptTrackChangeService';
import RejectTrackChangeService from './RejectTrackChangeService/RejectTrackChangeService';
import ShowHideTrackChangeService from './ShowHideTrackChangeService/ShowHideTrackChangeService';
import TrackingAndEditingToolGroupService from './TrackingAndEditingToolGroupService/TrackingAndEditingToolGroupService';

export default [
  new EnableTrackChangeService(),
  new AcceptTrackChangeService(),
  new RejectTrackChangeService(),
  new ShowHideTrackChangeService(),
  new TrackingAndEditingToolGroupService(),
];
