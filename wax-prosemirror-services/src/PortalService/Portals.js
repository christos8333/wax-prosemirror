import { injectable } from 'inversify';

@injectable()
export default class Portals {
  portals = [];
  addPortal(portal) {
    this.portals.push(portal);
  }

  getPortals() {
    return this.portals;
  }
}
