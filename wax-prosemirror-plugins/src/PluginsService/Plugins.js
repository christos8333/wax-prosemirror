import { injectable } from "inversify";

@injectable()
class Plugins {
  constructor() {
    console.log("in Plugins");
  }

  addPlugins() {}
}

export default Plugins;
