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
    @inject("Blockquote") blockquote
  ) {
    super();
    code.hideOnToolbar = true;
    strong.hideOnToolbar = true;
    blockquote.hideOnToolbar = true;
    subscript.hideOnToolbar = true;
    superscript.hideOnToolbar = true;
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
      blockquote
    ];
  }
}

export default Annotations;
