import InlineServices from "./index";
import Service from "wax-prosemirror-core/src/services/Service";

class InlineAnnotationsService extends Service {
  dependencies = InlineServices;
}

export default InlineAnnotationsService;
