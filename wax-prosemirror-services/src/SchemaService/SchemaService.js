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
        if (options.toWaxSchema) {
          context.container
            .bind("schema")
            .toConstantValue(schema)
            .whenTargetNamed("node");
        } else {
          const schemaInstance = context.container.get("Schema");

          schemaInstance.addProsemirrorSchema(schema, "nodes");
        }
      };
    });

    this.container.bind("CreateMark").toFactory(context => {
      return (schema, options = { toWaxSchema: false }) => {
        if (options.toWaxSchema) {
          context.container
            .bind("schema")
            .toConstantValue(schema)
            .whenTargetNamed("mark");
        } else {
          const schemaInstance = context.container.get("Schema");
          schemaInstance.addProsemirrorSchema(schema, "marks");
        }
      };
    });
  }
}
