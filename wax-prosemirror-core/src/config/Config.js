/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { set, get, isArrayLikeObject } from 'lodash';
import { injectable, inject } from 'inversify';

@injectable()
export default class Config {
  _config = {};
  constructor(@inject('config') config) {
    this._config = config;
  }

  set(key, value) {
    set(this._config, key, value);
    return this._config;
  }

  get(key) {
    return get(this._config, key);
  }

  pushToArray(key, value) {
    let oldValue = this.get(key);
    if (oldValue) {
      if (isArrayLikeObject(value)) {
        value.forEach(v => {
          oldValue.push(v);
        });
      } else {
        oldValue.push(value);
      }
    } else {
      oldValue = value;
    }
    this.set(key, oldValue);
    return this;
  }
}
