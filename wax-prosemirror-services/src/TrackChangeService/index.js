import EnableTrackChangeService from './EnableTrackChangeService/EnableTrackChangeService';
import AcceptTrackChangeService from './AcceptTrackChangeService/AcceptTrackChangeService';
import RejectTrackChangeService from './RejectTrackChangeService/RejectTrackChangeService';
import ShowHideTrackChangeService from './ShowHideTrackChangeService/ShowHideTrackChangeService';

export default [
  new EnableTrackChangeService(),
  new AcceptTrackChangeService(),
  new RejectTrackChangeService(),
  new ShowHideTrackChangeService(),
];
