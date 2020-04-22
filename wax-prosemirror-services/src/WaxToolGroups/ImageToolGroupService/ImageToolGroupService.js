import { Service } from "wax-prosemirror-core";
import Images from "./Images";

class ImageToolGroupService extends Service {
  name = "ImageToolGroupService";

  register() {
    this.container.bind("Images").to(Images);
  }
}

export default ImageToolGroupService;
