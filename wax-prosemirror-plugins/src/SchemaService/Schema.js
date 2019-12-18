import { Schema as PmPschema } from "prosemirror-model";
import { injectable } from "inversify";

import Node from "./Node";
import Mark from "./Mark";
import { EditoriaSchema } from "wax-prosemirror-schema";

@injectable()
export default class Schema {
  _nodes = {};
  _marks = {};
  schema = null;

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

    return new PmPschema({ nodes, marks });
  }
}
