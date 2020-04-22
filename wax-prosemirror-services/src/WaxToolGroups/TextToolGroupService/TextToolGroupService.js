import Service from "../../Service";
import Text from "./Text";

class TextToolGroupService extends Service {
  name = "TextToolGroupService";

  register() {
    this.container.bind("Text").to(Text);
  }
}

export default TextToolGroupService;
