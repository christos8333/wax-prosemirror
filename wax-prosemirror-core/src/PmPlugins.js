/* eslint-disable no-underscore-dangle */
import { injectable } from 'inversify';

export default
@injectable()
class PmPlugins {
  _plugins = new Map();
  add(key, plugin) {
    this._plugins.set(key, plugin);
  }

  getAll() {
    return [...this._plugins.values()];
  }

  get(key) {
    return this._plugins.get(key);
  }
}
