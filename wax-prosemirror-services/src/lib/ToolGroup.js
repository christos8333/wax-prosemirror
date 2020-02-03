import React, { useState } from "react";
import { injectable } from "inversify";
import { ToolGroupComponent } from "wax-prosemirror-components";

@injectable()
export default class ToolGroup {
  _config = {};
  title = "";
  _tools = [];
  constructor() {}
  setGroupConfig(config) {
    this._config = config;
  }

  excludeIncludeTools() {
    const { exclude = [], include = [] } = this._config;

    if (include.length > 0) {
      this._tools.map(tool => {
        if (include.includes(tool.constructor.name)) {
          tool.enableTool();
        } else {
          tool.disableTool();
        }
      });
    } else {
      this._tools.map(tool => {
        if (exclude.includes(tool.constructor.name)) {
          tool.disableTool();
        }
      });
    }
  }

  set tools(tools) {
    this._tools = tools;
    for (var i in this._tools) {
      if (this._tools[i].hideOnToolbar) {
        this._tools.push(this._tools.splice(i, 1)[0]);
      }
    }
  }

  renderTools(view) {
    const { name } = this.constructor;
    return (
      <ToolGroupComponent
        key={`groupName-${name}`}
        view={view}
        tools={this._tools}
        title={this.title}
        name={name}
      />
    );
  }
}
