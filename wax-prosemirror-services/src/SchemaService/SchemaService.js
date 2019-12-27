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
      return (schema, options) => {
        if (options.toWaxSchema) {
          context
            .bind("schema")
            .toConstantValue(schema)
            .whenTargetNamed("node");
        } else {
          const schema = context.get("Schema");
          schema.addProsemirrorSchema(schema, "nodes");
        }
      };
    });

    this.container.bind("CreateMark").toFactory(context => {
      return (schema, options) => {
        if (options.toWaxSchema) {
          context
            .bind("schema")
            .toConstantValue(schema)
            .whenTargetNamed("mark");
        } else {
          const schema = context.get("Schema");
          schema.addProsemirrorSchema(schema, "marks");
        }
      };
    });
  }
}
