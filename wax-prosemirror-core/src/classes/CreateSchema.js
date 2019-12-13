import { Schema } from "prosemirror-model";

class CreateSchema {
  constructor(schema) {
    if (!schema) {
      throw new Error("schema is mandatory");
    }
    const { nodes, marks } = schema;

    if (!nodes || !marks) {
      throw new Error("no nodes or marks found");
    }

    this.nodes = nodes;
    this.marks = marks;
    return this.initSchema();
  }

  initSchema() {
    return new Schema(this.toJSON());
  }

  toJSON() {
    return {
      nodes: this.nodes,
      marks: this.marks
    };
  }

  setDefaultSchema() {}
}

export default CreateSchema;
