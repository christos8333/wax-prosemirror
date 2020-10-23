import React, { useMemo } from 'react';
import { injectable } from 'inversify';
import { ToolGroupComponent, ToolGroups } from 'wax-prosemirror-components';
import { v4 as uuidv4 } from 'uuid';
import { isEmpty } from 'lodash';

export default
@injectable()
class ToolGroup {
  _config = {};
  title = '';
  _tools = [];
  _toolGroups = [];

  setGroupConfig(config) {
    this._config = config;
  }

  set toolGroups(groups) {
    this._toolGroups = groups;
  }

  excludeIncludeTools() {
    const { exclude = [], include = [] } = this._config;

    if (include.length > 0) {
      this._tools.map(tool => {
        if (include.includes(tool.name)) {
          tool.displayTool();
        } else {
          tool.hideTool();
        }
      });
    } else {
      this._tools.map(tool => {
        if (exclude.includes(tool.name)) {
          tool.hideTool();
        }
      });
    }
  }

  addToolIntoMore() {
    const { more = [] } = this._config;
    if (more.length > 0) {
      this._tools.map(tool => {
        if (more.includes(tool.name)) {
          tool.hideInToolGroup();
        } else {
          tool.displayInToolGroup();
        }
      });
    }
  }

  set tools(tools) {
    this._tools = tools;
  }

  renderTools(view) {
    if (isEmpty(view)) return null;

    const { name } = this.constructor;
    if (this._toolGroups > 0) {
      return <ToolGroups toolGroups={this._toolGroups} view={view} />;
    }

    const MemorizedToolGroupComponent = useMemo(
      () => (
        <ToolGroupComponent
          key={uuidv4()}
          view={view}
          tools={this._tools}
          title={this.title}
          name={name}
        />
      ),
      [],
    );

    return MemorizedToolGroupComponent;
  }
}
