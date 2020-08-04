import EnableTrackChangeService from './EnableTrackChangeService/EnableTrackChangeService';
import AcceptTrackChangeService from './AcceptTrackChangeService/AcceptTrackChangeService';
import RejectTrackChangeService from './RejectTrackChangeService/RejectTrackChangeService';

export default [
  new EnableTrackChangeService(),
  new AcceptTrackChangeService(),
  new RejectTrackChangeService(),
];
