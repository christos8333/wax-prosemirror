import React, { useState } from "react";
import { injectable } from "inversify";
import { isFunction } from "lodash";

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
    const [more, showHide] = useState(false);
    const tools = [];
    const rest = [];
    this._tools.forEach(tool => {
      if (tool.hideOnToolbar) {
        rest.push(tool.renderTool(view));
      } else {
        tools.push(tool.renderTool(view));
      }
    });

    const Title = isFunction(this.title) ? this.title : () => this.title;

    return (
      <div key={`groupName-${this.constructor.name}`}>
        <Title />
        {tools}
        {rest.length && !more ? (
          <button onClick={() => showHide(!more)}>...</button>
        ) : null}
        {more && (
          <div>
            <button onClick={() => showHide(!more)}>...</button>
            <div
              style={{
                display: "flex",
                width: "0",
                top: "40px",
                position: "relative",
                right: "100%"
              }}
            >
              {rest}
            </div>
          </div>
        )}
      </div>
    );
  }
}
