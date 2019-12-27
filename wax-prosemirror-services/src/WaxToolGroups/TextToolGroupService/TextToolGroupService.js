import Text from "./Text";
import Service from "wax-prosemirror-core/src/services/Service";

class TextToolGroupService extends Service {
  name = "TextToolGroupService";

  register() {
    this.container.bind("Text").to(Text);
  }
}

export default TextToolGroupService;
