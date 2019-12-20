import { injectable } from "inversify";

@injectable()
export default class ToolGroup {
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
          tool.enableTool();
        } else {
          tool.disableTool();
        }
      });
    } else {
      this.tools.map(tool => {
        if (exclude.includes(tool.constructor.name)) {
          tool.disableTool();
        }
      });
    }
  }

  renderTools(view) {
    const tools = [];
    this.tools.forEach(tool => {
      tools.push(tool.renderTool(view));
    });
    return tools;
  }
}
