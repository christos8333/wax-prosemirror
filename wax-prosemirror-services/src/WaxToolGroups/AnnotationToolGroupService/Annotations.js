import { injectable, inject } from "inversify";
import ToolGroup from "../../lib/ToolGroup";

@injectable()
class Annotations extends ToolGroup {
  tools = [];
  constructor(
    @inject("Code") code,
    @inject("Emphasis") emphasis,
    @inject("Link") link,
    @inject("SmallCaps") smallcaps,
    @inject("StrikeThrough") strikethrough,
    @inject("Strong") strong,
    @inject("Subscript") subscript,
    @inject("Superscript") superscript,
    @inject("Underline") underline,
    @inject("Blockquote") blockquote,
    @inject("Image") image
  ) {
    super();
    this.tools = [
      code,
      emphasis,
      link,
      smallcaps,
      strikethrough,
      strong,
      subscript,
      superscript,
      underline,
      blockquote,
      image
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

export default Annotations;
