import { set, get, isArrayLikeObject } from "lodash";
import { injectable, inject } from "inversify";

@injectable()
export default class Config {
  config = {};
  constructor(@inject("config") config) {
    this.config = config;
  }

  set(key, value) {
    set(this.config, key, value);
    return this.config;
  }

  get(key) {
    return get(this.config, key);
  }

  pushToArray(key, value) {
    const oldValue = this.get(key);
    let newValue = value;
    if (oldValue && isArrayLikeObject(oldValue)) {
      newValue = oldValue.push(value);
    }

    return this.set(key, newValue);
  }
}
