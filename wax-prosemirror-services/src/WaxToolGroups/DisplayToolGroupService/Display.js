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
  constructor(
    @inject("Author") author,
    @inject("Title") title,
    @inject("SubTitle") subtitle,
    @inject("EpigraphProse") epigraphprose,
    @inject("EpigraphPoetry") epigraphpoetry,
    @inject("Heading1") heading1,
    @inject("Heading2") heading2,
    @inject("Heading3") heading3
  ) {
    super();
    this.tools = [
      title,
      author,
      subtitle,
      epigraphprose,
      epigraphpoetry,
      heading1,
      heading2,
      heading3
    ];
  }
}

export default Display;
