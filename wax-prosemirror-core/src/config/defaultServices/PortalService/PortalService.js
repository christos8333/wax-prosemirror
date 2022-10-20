import { Service } from 'wax-prosemirror-core';
import PortalComponent from './components/PortalComponent';
import PortalPlugin from './portalPlugin';
import Portals from './Portals';

class PortalService extends Service {
  boot() {
    const portals = this.container.get('Portals');
    this.app.PmPlugins.add(
      'portalPlugin',
      PortalPlugin({
        createPortal: this.app.context.createPortal,
        portals: portals.getPortals(),
      }),
    );
  }

  register() {
    const layout = this.container.get('Layout');
    layout.addComponent('waxPortals', PortalComponent);

    this.container.bind('Portals').to(Portals).inSingletonScope();

    this.container.bind('AddPortal').toFactory(context => {
      return portal => {
        const portalInstance = context.container.get('Portals');
        portalInstance.addPortal(portal);
      };
    });
  }
}

export default PortalService;
