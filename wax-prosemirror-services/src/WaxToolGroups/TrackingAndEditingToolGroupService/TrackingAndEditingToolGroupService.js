import Service from '../../Service';
import TrackingAndEditing from './TrackingAndEditing';

class TrackingAndEditingToolGroupService extends Service {
  register() {
    this.container.bind('TrackingAndEditing').to(TrackingAndEditing);
  }
}

export default TrackingAndEditingToolGroupService;
