import Service from '../../Service';
import JoinUp from './JoinUp';

class JoinUpService extends Service {
  name = 'JoinUpService';
  register() {
    // this.container.bind('JoinUp').to(JoinUp);
    this.container.bind('JoinUp').toDynamicValue(() => {
      return new JoinUp(this.config);
    });
  }
}

export default JoinUpService;
