/* eslint-disable no-underscore-dangle */
import React, { useMemo } from 'react';
import { injectable, inject } from 'inversify';
import { v4 as uuidv4 } from 'uuid';
import { isEmpty } from 'lodash';
import ToolGroups from '../../components/ToolGroups';
import ToolGroupComponent from '../../components/ToolGroupComponent';

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
        return true;
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

  renderTools(state) {
    if (isEmpty(state)) return null;

    const { name } = this.constructor;
    if (this._toolGroups > 0) {
      return <ToolGroups toolGroups={this._toolGroups} state={state} />;
    }

    const MemorizedToolGroupComponent = useMemo(
      () => (
        <ToolGroupComponent
          key={uuidv4()}
          name={name}
          title={this.title}
          tools={this._tools}
          state={state}
        />
      ),
      [],
    );

    return MemorizedToolGroupComponent;
  }
}

export default ToolGroup;
