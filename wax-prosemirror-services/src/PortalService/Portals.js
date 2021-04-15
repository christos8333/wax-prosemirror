import { injectable } from 'inversify';

export default
@injectable()
class Portals {
  portals = [];
  addPortal(portal) {
    this.portals.push(portal);
  }

  getPortals() {
    return this.portals;
  }
}
