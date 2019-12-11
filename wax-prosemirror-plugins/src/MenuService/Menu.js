import React from "react";
import { injectable } from "inversify";
import GroupTool from "../lib/GroupTool";

import MenuWrapper from "./MenuWrapper";
@injectable()
export default class Menu {
  groupTools = [];
  config = {};
  name = "";
  constructor(config, createTools) {
    this.name = config.name;
    this.config = config;
    this.groupTools = createTools(this.config.groupTools);
    this.excludeIncludeTools();
  }

  excludeIncludeTools() {
    this.groupTools.forEach(groupTool => {
      if (groupTool instanceof GroupTool) {
        groupTool.excludeIncludeTools();
      }
    });
  }

  render() {
    return view => <MenuWrapper items={this.groupTools} view={view} />;
  }
}

// {
//   templateArea: "topBar",
//   tools: [
//     "redo-undo",
//     { name: "Annotations", exclude: [], include: [] }
//   ]
// }
