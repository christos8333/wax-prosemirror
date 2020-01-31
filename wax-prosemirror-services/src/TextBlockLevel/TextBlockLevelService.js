import TextServices from "./index";
import Service from "wax-prosemirror-core/src/services/Service";

class TextBlockLevelService extends Service {
  dependencies = TextServices;
}

export default TextBlockLevelService;
