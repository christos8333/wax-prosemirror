import { Service } from "wax-prosemirror-core";
import Annotations from "./Annotations";

class AnnotationToolGroupService extends Service {
  name = "AnnotationToolGroupService";

  register() {
    this.container.bind("Annotations").to(Annotations);
  }
}

export default AnnotationToolGroupService;
