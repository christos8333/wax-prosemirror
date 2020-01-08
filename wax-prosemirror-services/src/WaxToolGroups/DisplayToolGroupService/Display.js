import React from "react";
import { injectable, inject } from "inversify";
import ToolGroup from "../../lib/ToolGroup";

@injectable()
class Display extends ToolGroup {
  tools = [];
  title = () => {
    return (
      <span>
        Display
        <hr />
      </span>
    );
  };
  constructor(@inject("Author") author) {
    super();
    this.tools = [author];
  }
}

export default Display;
