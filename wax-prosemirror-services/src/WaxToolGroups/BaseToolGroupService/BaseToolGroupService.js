import Service from "../../Service";
import Base from "./Base";

class BaseToolGroupService extends Service {
  name = "BaseToolGroupService";

  register() {
    this.container.bind("Base").to(Base);
  }
}

export default BaseToolGroupService;
