import Service from "../Service";
import InlineServices from "./index";

class InlineAnnotationsService extends Service {
  dependencies = InlineServices;
}

export default InlineAnnotationsService;
