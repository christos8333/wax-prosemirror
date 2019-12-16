export default class Service {
  app = {};
  setApp(app) {
    this.app = app;
  }

  get container() {
    return this.app.container;
  }

  get config() {
    return this.app.config.get(`config.${this.name}`);
  }

  get schema() {
    return this.app.getSchema();
  }
}
