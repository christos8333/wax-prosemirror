import Service from "wax-prosemirror-core/src/services/Service";
import { linkMark } from "wax-prosemirror-schema";
import Link from "./Link";

class LinkService extends Service {
  boot() {
    const createMark = this.container.get("CreateMark");

    createMark({ link: linkMark });
  }

  register() {
    this.container.bind("Link").to(Link);
  }
}

export default LinkService;
