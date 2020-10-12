import { mathPlugin, mathSelectPlugin } from 'wax-prosemirror-plugins';
import Service from '../Service';

class MathService extends Service {
  name = 'MathService';

  boot() {
    this.app.PmPlugins.add('mathplugin', mathPlugin);
    this.app.PmPlugins.add('mathselectplugin', mathSelectPlugin);
    console.log(this.app);
  }

  register() {}
}

export default MathService;
