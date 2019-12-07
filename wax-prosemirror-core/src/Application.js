import { Container } from "inversify";
import "reflect-metadata";
import Config from "./Config/Config";
import defaultConfig from "./Config/defaultConfig";

export default class Application {
  container = {};
  config = {};
  constructor(container) {
    this.container = container;
  }

  registerServices() {
    this.config.get("services").map(service => {
      /* 
      set App to every service
      so services can have access to containers and config
      */
      service.setApp(this);

      if (service.register) {
        service.register();
      }
    });
  }

  setConfig(config) {
    this.config = this.container.get("Config");
    Object.keys(config).forEach(conf => {
      this.config = this.config.pushToArray(conf, config[conf]);
    });
  }

  bootServices() {
    const services = this.config.get("services");
    services.map(plugin => {
      if (plugin.boot) {
        plugin.boot();
      }
    });
  }

  static create(config) {
    /*
    Create Container
    */
    const container = new Container();

    /*
    Set base bindings for the App to work
    */
    container.bind("Wax").toFactory(() => new Application(container));
    container.bind("config").toConstantValue(defaultConfig);
    container
      .bind("Config")
      .to(Config)
      .inSingletonScope();

    /*
    Start the App
    */
    const app = container.get("Wax");
    app.setConfig(config);
    app.registerServices();

    return app;
  }
}
