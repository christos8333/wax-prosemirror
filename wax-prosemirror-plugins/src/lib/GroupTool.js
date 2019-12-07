import { injectable } from "inversify";

@injectable()
export default class GroupTool {
  _config = {};
  constructor() {}
  setGroupConfig(config) {
    this._config = config;
  }
  excludeIncludeTools() {
    const { exclude = [], include = [] } = this._config;

    if (include.length > 0) {
      this.tools.map(tool => {
        if (include.includes(tool.constructor.name)) {
          tool.enable();
        } else {
          tool.disable();
        }
      });
    } else {
      this.tools.map(tool => {
        if (exclude.includes(tool.constructor.name)) {
          tool.disable();
        }
      });
    }
  }
}
