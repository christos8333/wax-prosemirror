import React from "react";
import { injectable, inject } from "inversify";
import ToolGroup from "../lib/ToolGroup";
@injectable()
export default class Annotation extends ToolGroup {
  tools = [];
  title = () => {
    return (
      <span>
        Annotations
        <hr />
      </span>
    );
  };
  constructor(
    @inject("EpigraphPoetry") epigraphPoetry,
    @inject("EpigraphProse") epigraphProse,
    @inject("Heading1") heading1,
    @inject("Heading2") heading2,
    @inject("Heading3") heading3,
    @inject("Plain") plain,
    @inject("Subtitle") subtitle,
    @inject("Title") title
  ) {
    super();
    this.tools = [
      epigraphPoetry,
      epigraphProse,
      heading1,
      heading2,
      heading3,
      plain,
      subtitle,
      title
    ];
  }
}
