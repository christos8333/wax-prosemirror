import { Service } from "wax-prosemirror-core";
import TextServices from "./index";

class TextBlockLevelService extends Service {
  dependencies = TextServices;
}

export default TextBlockLevelService;
