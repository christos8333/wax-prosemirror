import { injectable, inject } from "inversify";
import ToolGroup from "../lib/ToolGroup";

@injectable()
export default class Annotation extends ToolGroup {
  tools = [];
  constructor(
    @inject("Code") code,
    @inject("Em") em,
    @inject("Link") link,
    @inject("SmallCaps") smallcaps,
    @inject("StrikeThrough") strikethrough,
    @inject("Strong") strong,
    @inject("Subscript") subscript,
    @inject("Superscript") superscript,
    @inject("Underline") underline,
    @inject("Blockquote") blockquote,
    @inject("Image") image,
    @inject("Table") table,
    @inject("TableDropDownOptions") tableDropDownOptions
  ) {
    super();
    this.tools = [
      code,
      em,
      link,
      smallcaps,
      strikethrough,
      strong,
      subscript,
      superscript,
      underline,
      blockquote,
      tableDropDownOptions,
      image,
      table
    ];
  }

  renderTools(view) {
    const tools = [];
    this.tools.forEach(tool => {
      tools.push(tool.renderTool(view));
    });
    return tools;
  }
}
