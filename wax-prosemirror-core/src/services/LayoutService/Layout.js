import { injectable } from "inversify";
import { DefaultLayout } from "wax-prosemirror-layouts";
import LayoutFactory from "./components/LayoutFactory";

@injectable()
export default class Layout {
  components = [];
  layoutComponent = LayoutFactory(DefaultLayout);
  addComponent(renderArea, component, componentProps) {
    if (!this.components[renderArea]) {
      this.createArea(renderArea);
    }
    const size = this.components[renderArea].size;
    this.components[renderArea].set(size + 1, { component, componentProps });
    return this;
  }

  render(renderArea) {
    if (!this.components[renderArea]) return null;
    return this.getArray(this.components[renderArea]);
  }

  createArea(area) {
    this.components[area] = new Map();
  }

  getArray(iterator) {
    const components = [];
    iterator.forEach(component => components.push(component));
    return components;
  }

  setLayout(component) {
    this.layoutComponent = LayoutFactory(component);
  }
}
