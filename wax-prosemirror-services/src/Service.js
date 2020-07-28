class Service {
  setApp(app) {
    this.app = app;
  }

  get container() {
    return this.app.container;
  }

  get config() {
    return this.app.config.get(`config.${this.name}`) || this.app.config;
  }

  get schema() {
    return this.app.getSchema();
  }
}

export default Service;
