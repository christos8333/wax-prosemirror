import { Service } from 'wax-prosemirror-core';
import TrackCommentOptions from './TrackCommentOptions';

class TrackCommentOptionsToolGroupService extends Service {
  register() {
    this.container.bind('TrackCommentOptions').to(TrackCommentOptions);
  }
}

export default TrackCommentOptionsToolGroupService;
