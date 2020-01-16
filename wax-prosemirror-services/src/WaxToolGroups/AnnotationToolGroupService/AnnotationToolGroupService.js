import Service from "wax-prosemirror-core/src/services/Service";

import Annotations from "./Annotations";
import * as Tools from "./tools";

class AnnotationToolGroupService extends Service {
  name = "AnnotationToolGroupService";

  register() {
    this.container.bind("Annotations").to(Annotations);
  }
}

export default AnnotationToolGroupService;
