import Service from "wax-prosemirror-core/src/services/Service";
import Author from "./Author";

class AuthorService extends Service {
  boot() {}

  register() {
    this.container.bind("Author").to(Author);
  }
}

export default AuthorService;
