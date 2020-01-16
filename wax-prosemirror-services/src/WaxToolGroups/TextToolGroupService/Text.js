import React from "react";
import { injectable, inject } from "inversify";
import ToolGroup from "../../lib/ToolGroup";

@injectable()
class Text extends ToolGroup {
  tools = [];
  title = () => {
    return (
      <span>
        Text
        <hr />
      </span>
    );
  };
  constructor(
    @inject("Paragraph") paragraph,
    @inject("ParagraphContinued") paragraphContinued,
    @inject("ExtractProse") extractProse,
    @inject("ExtractPoetry") extractPoetry,
    @inject("SourceNote") sourceNote,
    @inject("BlockQuote") blockQuote
  ) {
    super();
    this.tools = [
      paragraph,
      paragraphContinued,
      extractProse,
      extractPoetry,
      sourceNote,
      blockQuote
    ];
  }
}

export default Text;
