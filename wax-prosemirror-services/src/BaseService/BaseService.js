import BaseServices from "./index";
import Service from "wax-prosemirror-core/src/services/Service";

class BaseService extends Service {
  dependencies = BaseServices;
}

export default BaseService;
