import { Schema as PmPschema } from "prosemirror-model";
import { injectable } from "inversify";
import DefaultSchema from "./DefaultSchema";

import Node from "./Node";
import Mark from "./Mark";

@injectable()
export default class Schema {
  _nodes = {};
  _marks = {};
  prosemirrorSchema = { nodes: {}, marks: {} };
  schema = null;

  addNode(schemaConfig) {
    const name = Object.keys(schemaConfig)[0];
    const config = schemaConfig[name];

    const node = new Node(name);
    let nd = {};

    if ((nd = this.has(node))) {
      nd.fromJSON(config);
      return nd;
    } else {
      node.fromJSON(config);
      this.addSchema(node);

      return { [name]: node };
    }
  }

  addMark(schemaConfig) {
    const name = Object.keys(schemaConfig)[0];
    const config = schemaConfig[name];

    const mark = new Mark(name);
    let mr = {};
    if ((mr = this.has(mark))) {
      mr.fromJSON(config);
      return mr;
    } else {
      mark.fromJSON(config);
      this.addSchema(mark);
      return { [name]: mark };
    }
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

  addProsemirrorSchema(nodes, type) {
    this.prosemirrorSchema[type] = Object.assign(
      this.prosemirrorSchema[type],
      nodes
    );
  }

  getSchema() {
    const nodes = DefaultSchema.nodes;
    const marks = {};

    for (let index in this._nodes) {
      nodes[index] = this._nodes[index].toJSON();
    }

    for (let index in this._marks) {
      marks[index] = this._marks[index].toJSON();
    }

    this.schema = new PmPschema({
      nodes: Object.assign(nodes, this.prosemirrorSchema.nodes),
      marks: Object.assign(marks, this.prosemirrorSchema.marks)
    });
    return this.schema;
  }
}
