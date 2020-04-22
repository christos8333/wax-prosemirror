import { Service } from "wax-prosemirror-core";
import Base from "./Base";

class BaseToolGroupService extends Service {
  name = "BaseToolGroupService";

  register() {
    this.container.bind("Base").to(Base);
  }
}

export default BaseToolGroupService;
