import { Schema } from "prosemirror-model";

import nodes from "../nodes";
import marks from "../marks";

class WaxSchema {
  constructor(config = { nodes: {}, marks: {} }) {
    if (!WaxSchema.instance) {
      this.schema = {};
      Object.assign(nodes, config.nodes);
      Object.assign(marks, config.marks);
      const schema = new Schema({ nodes, marks });
      WaxSchema.instance = schema;
      return WaxSchema.instance;
    }

    return WaxSchema.instance;
  }
}

export default config => {
  const instance = new WaxSchema(config);
  return Object.freeze(instance);
};
