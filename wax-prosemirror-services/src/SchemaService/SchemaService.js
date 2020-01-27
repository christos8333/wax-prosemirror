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

    this.container.bind("CreateNode").toFactory(context => {
      return (schema, options = { toWaxSchema: false }) => {
        const schemaInstance = context.container.get("Schema");
        if (options.toWaxSchema) {
          schemaInstance.addNode(schema);
        } else {
          schemaInstance.addProsemirrorSchema(schema, "nodes");
        }
      };
    });

    this.container.bind("CreateMark").toFactory(context => {
      return (schema, options = { toWaxSchema: false }) => {
        const schemaInstance = context.container.get("Schema");
        if (options.toWaxSchema) {
          schemaInstance.addMark(schema);
        } else {
          schemaInstance.addProsemirrorSchema(schema, "marks");
        }
      };
    });
  }
}
