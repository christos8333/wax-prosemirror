import { Schema as PmPschema } from "prosemirror-model";
import { injectable, multiInject, named, inject } from "inversify";

import Node from "./Node";
import Mark from "./Mark";
import { EditoriaSchema } from "wax-prosemirror-schema";

@injectable()
export default class Schema {
  _nodes = {};
  _marks = {};
  schema = null;

  constructor(
    @multiInject("schema") @named("mark") marks,
    @multiInject("schema") @named("node") nodes,
    @inject("CreateNode") createNode,
    @inject("CreateMark") createMark
  ) {
    this._nodes = nodes.map(node => {
      createNode(node);
    });
    this._marks = marks.map(mark => {
      createMark(mark);
    });
  }

  has(instance) {
    if (instance instanceof Node) {
      return this._nodes[instance.name] ? this._nodes[instance.name] : false;
    }
    if (instance instanceof Mark) {
      return this._marks[instance.name] ? this._marks[instance.name] : false;
    }
  }

  addSchema(instance) {
    if (instance instanceof Node) {
      return this._nodes[instance.name]
        ? this._nodes[instance.name]
        : Object.assign(this._nodes, {
            [instance.name]: instance
          });
    }

    if (instance instanceof Mark) {
      return this._marks[instance.name]
        ? this._marks[instance.name]
        : Object.assign(this._marks, {
            [instance.name]: instance
          });
    }
  }

  getSchema() {
    /* this is temporally until all of the packages moved to schemas */
    if (this.schema) return this.schema;
    const nodes = EditoriaSchema.nodes;
    const marks = EditoriaSchema.marks;

    for (let index in this._nodes) {
      nodes[index] = this._nodes[index].toJSON();
    }

    for (let index in this._marks) {
      marks[index] = this._marks[index].toJSON();
    }

    this.schema = new PmPschema({ nodes, marks });
    return this.schema;
  }
}
