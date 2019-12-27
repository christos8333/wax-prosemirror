import Base from "./Base";
import Service from "wax-prosemirror-core/src/services/Service";

class BaseToolGroupService extends Service {
  name = "BaseToolGroupService";

  register() {
    this.container.bind("Base").to(Base);
  }
}

export default BaseToolGroupService;
