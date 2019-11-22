import { injectable, multiInject } from "inversify";

@injectable()
export default class Layout {
  constructor() {
    this.components = new Map();
  }

  addComponent(renderArea, component) {
    this.components.set(renderArea, component);
    return this;
  }

  render(renderArea) {
    return { Component: this.components.get(renderArea) };
  }
}
