import TextStyle from "./TextStyle";
import Service from "wax-prosemirror-core/src/services/Service";
import * as Tools from "./tools";

export default class TextStyleService extends Service {
  name = "TextStyleService";

  register() {
    this.container.bind("TextStyle").to(TextStyle);
    Object.entries(Tools).forEach(([key, value]) => {
      this.container.bind(key).to(value);
    });
  }
}
