import Image from "./Image";
import Service from "wax-prosemirror-core/src/services/Service";

class ImageToolGroupService extends Service {
  name = "ImageToolGroupService";

  register() {
    this.container.bind("Image").to(Image);
  }
}

export default ImageToolGroupService;
