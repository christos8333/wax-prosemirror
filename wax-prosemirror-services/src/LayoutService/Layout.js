import { injectable } from 'inversify';
import DefaultLayout from './DefaultLayout/DefaultLayout';
import LayoutFactory from './components/LayoutFactory';

@injectable()
export default class Layout {
  components = [];
  layoutComponent = LayoutFactory(DefaultLayout);
  addComponent(renderArea, component, componentProps) {
    if (!this.components[renderArea]) {
      this.createArea(renderArea);
    }
    const { size } = this.components[renderArea];
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

  // eslint-disable-next-line class-methods-use-this
  getArray(iterator) {
    const components = [];
    iterator.forEach(component => components.push(component));
    return components;
  }

  setLayout(component) {
    this.layoutComponent = LayoutFactory(component);
  }
}
