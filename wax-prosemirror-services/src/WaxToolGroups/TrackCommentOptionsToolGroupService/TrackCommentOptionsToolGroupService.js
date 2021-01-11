import Service from '../../Service';
import TrackCommentOptions from './TrackCommentOptions';

class TrackCommentOptionsToolGroupService extends Service {
  register() {
    this.container.bind('TrackCommentOptions').to(TrackCommentOptions);
  }
}

export default TrackCommentOptionsToolGroupService;
