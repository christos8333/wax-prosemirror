import Images from "./Images";
import Service from "wax-prosemirror-core/src/services/Service";

class ImageToolGroupService extends Service {
  name = "ImageToolGroupService";

  register() {
    this.container.bind("Images").to(Images);
  }
}

export default ImageToolGroupService;
