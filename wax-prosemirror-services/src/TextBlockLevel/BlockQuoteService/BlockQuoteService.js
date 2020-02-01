import Service from "wax-prosemirror-core/src/services/Service";
import { blockQuoteNode } from "wax-prosemirror-schema";
import BlockQuote from "./BlockQuote";

class BlockQuoteService extends Service {
  boot() {}

  register() {
    this.container.bind("BlockQuote").to(BlockQuote);
    const createNode = this.container.get("CreateNode");
    createNode({
      blockquote: blockQuoteNode
    });
  }
}

export default BlockQuoteService;
