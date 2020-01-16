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
    @inject("Underline") underline
  ) {
    super();
    smallcaps.hideOnToolbar = true;
    subscript.hideOnToolbar = true;
    superscript.hideOnToolbar = true;
    this.tools = [
      strong,
      emphasis,
      code,
      link,
      strikethrough,
      underline,
      smallcaps,
      subscript,
      superscript
    ];
  }
}

export default Annotations;
