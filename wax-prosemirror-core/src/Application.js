import { Container } from 'inversify';
import 'reflect-metadata';
import deepmerge from 'deepmerge';
import Config from './config/Config';
import defaultConfig from './config/defaultConfig';
import PmPlugins from './PmPlugins';

export default class Application {
  constructor(container) {
    this.container = container;
    this.PmPlugins = container.get('PmPlugins');
  }

  registerServices() {
    let count = 0;
    while (count < this.config.get('config.services').length) {
      const allServices = this.config.get('config.services');
      const service = this.config.get('config.services')[count];
      /*
        set App to every service
        so services can have access to containers and config
        */
      service.setApp(this);

      if (service.dependencies) {
        const servicePos = count;
        allServices.splice(servicePos + 1, 0, ...service.dependencies);
      }

      if (service.register) {
        service.register();
      }

      count += 1;
    }
  }

  setConfig() {
    this.config = this.container.get('Config');
  }

  bootServices() {
    const services = this.config.get('config.services');
    services.forEach(plugin => {
      if (plugin.boot) {
        plugin.boot();
      }
    });
  }

  getPlugins() {
    return this.PmPlugins.getAll();
  }

  getSchema() {
    this.schema = this.container.get('Schema');
    console.log(this.schema.getSchema());
    return this.schema.getSchema();
  }

  resetApp() {
    this.container = {};
    this.config = {};
    this.PmPlugins = {};
    this.schema = {};
  }

  static create(config) {
    /* Merge Core Config with User Config */
    const appConfig = deepmerge({ config: defaultConfig }, config, {
      customMerge: key => {
        if (key === 'services') {
          return (coreService, configService) => {
            return coreService.concat(configService);
          };
        }
      },
    });

    /*
    Create Container
    */
    const container = new Container();
    /*

    Set base bindings for the App to work
    */
    container.bind('PmPlugins').to(PmPlugins).inSingletonScope();

    container.bind('Wax').toFactory(() => new Application(container));

    container.bind('config').toConstantValue(appConfig);
    container.bind('Config').to(Config).inSingletonScope();

    /*
    Start the App
    */
    const app = container.get('Wax');
    app.setConfig();

    if (appConfig.config.PmPlugins) {
      appConfig.config.PmPlugins.forEach(configPlugin => {
        app.PmPlugins.add(configPlugin.key, configPlugin);
      });
    }
    app.registerServices();

    return app;
  }
}
