import Container from "../ioc";

export default class Service {
  constructor() {
    this.container = Container;
  }

  boot() {}
}
