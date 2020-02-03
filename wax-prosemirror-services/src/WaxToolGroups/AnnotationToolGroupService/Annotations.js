import { injectable, inject } from "inversify";
import ToolGroup from "../../lib/ToolGroup";

@injectable()
class Annotations extends ToolGroup {
  tools = [];
  constructor(
    @inject("Code") code,
    @inject("Emphasis") emphasis,
    @inject("Link") link,
    @inject("StrikeThrough") strikethrough,
    @inject("Strong") strong,
    @inject("Subscript") subscript,
    @inject("Superscript") superscript,
    @inject("Underline") underline,
    @inject("SmallCaps") smallcaps
  ) {
    super();
    subscript.hideOnToolbar = true;
    superscript.hideOnToolbar = true;
    smallcaps.hideOnToolbar = true;
    this.tools = [
      strong,
      emphasis,
      code,
      link,
      strikethrough,
      underline,
      subscript,
      superscript,
      smallcaps
    ];
  }
}

export default Annotations;
