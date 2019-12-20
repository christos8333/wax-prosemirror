import Annotation from "./Annotation";
import Service from "wax-prosemirror-core/src/services/Service";
import * as Tools from "./tools";

export default class AnnotationService extends Service {
  name = "AnnotationService";

  register() {
    this.container.bind("Annotation").to(Annotation);
    Object.entries(Tools).forEach(([key, value]) => {
      this.container.bind(key).to(value);
    });
  }
}
