import Service from "wax-prosemirror-core/src/services/Service";
import Schema from "./Schema";
import Node from "./Node";
import Mark from "./Mark";

export default class SchemaService extends Service {
  name = "SchemaService";

  register() {
    this.container
      .bind("Schema")
      .to(Schema)
      .inSingletonScope();

    //     this.container.bind("CreateNode").toFactory(context => {
    //       return schemaConfig => {
    //         const schema = context.container.get("Schema");
    //         const name = Object.keys(schemaConfig)[0];
    //         const config = schemaConfig[name];

    //         const node = new Node(name);
    //         let nd = {};
    //         if ((nd = schema.has(node))) {
    //           nd.fromJSON(config);
    //           return nd;
    //         } else {
    //           node.fromJSON(config);
    //           schema.addSchema(node);
    //           return node;
    //         }
    //       };
    //     });

    //     this.container.bind("CreateMark").toFactory(context => {
    //       return schemaConfig => {
    //         const schema = context.container.get("Schema");
    //         const name = Object.keys(schemaConfig)[0];
    //         const config = schemaConfig[name];

    //         const mark = new Mark(name);
    //         let mr = {};
    //         if ((mr = schema.has(mark))) {
    //           mr.fromJSON(config);
    //           return mr;
    //         } else {
    //           mark.fromJSON(config);
    //           schema.addSchema(mark);
    //           return mark;
    //         }
    //       };
    //     });
  }
}
