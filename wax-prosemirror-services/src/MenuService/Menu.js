import React, { useMemo } from "react";
import { injectable } from "inversify";
import ToolGroup from "../lib/ToolGroup";

import MenuWrapper from "./MenuWrapper";

@injectable()
export default class Menu {
  toolGroups = [];
  config = {};
  name = "";
  constructor(config, createTools) {
    this.name = config.name;
    this.config = config;
    this.toolGroups = createTools(this.config.toolGroups);
    this.excludeIncludeTools();
  }

  excludeIncludeTools() {
    this.toolGroups.forEach(toolGroup => {
      if (toolGroup instanceof ToolGroup) {
        toolGroup.excludeIncludeTools();
      }
    });
  }

  render() {
    return view => {
      //if (!view) return null;

      const Bar = useMemo(
        () => <MenuWrapper items={this.toolGroups} view={view} />,
        [view]
      );
      return <>{Bar}</>;
    };
  }
}
