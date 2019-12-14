import { Container } from "inversify";
import { Schema } from "prosemirror-model";
import "reflect-metadata";
import Config from "./Config/Config";
import defaultConfig from "./Config/defaultConfig";
import PmPlugins from "./PmPlugins";

export default class Application {
  container = {};
  config = {};
  PmPlugins = {};
  constructor(container) {
    this.container = container;
    this.PmPlugins = container.get("PmPlugins");
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

  getPlugins() {
    return this.PmPlugins.getAll();
  }

  getSchema() {
    const schema = this.container.get("Schema");
    return new Schema(schema.getSchema());
  }

  static create(config) {
    /*
    Create Container
    */
    const container = new Container();

    /*
    Set base bindings for the App to work
    */
    container
      .bind("PmPlugins")
      .to(PmPlugins)
      .inSingletonScope();
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
