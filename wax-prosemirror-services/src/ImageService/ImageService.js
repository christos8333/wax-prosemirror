import Image from "./Image";
import Service from "wax-prosemirror-core/src/services/Service";

export default class ImageService extends Service {
  name = "ImageService";

  register() {
    this.container.bind("Image").to(Image);
  }
}
