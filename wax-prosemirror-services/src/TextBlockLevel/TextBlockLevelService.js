import Service from "../Service";
import TextServices from "./index";

class TextBlockLevelService extends Service {
  dependencies = TextServices;
}

export default TextBlockLevelService;
