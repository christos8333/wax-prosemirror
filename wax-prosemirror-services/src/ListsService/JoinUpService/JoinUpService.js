import Service from "../../Service";
import JoinUp from "./JoinUp";

class JoinUpService extends Service {
  boot() {}

  register() {
    this.container.bind("JoinUp").to(JoinUp);
  }
}

export default JoinUpService;
