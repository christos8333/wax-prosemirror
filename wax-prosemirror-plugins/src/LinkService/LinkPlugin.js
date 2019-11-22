import React from "react";
import { injectable, multiInject, inject, named } from "inversify";

const Component1 = props => <div>{props.renderArea}</div>;
const Component2 = props => <div>{props.renderArea}</div>;

@injectable()
export default class LinkPlugin {
  items = [
    {
      link: "1",
      link2: "3"
    },
    {
      link: "2",
      link2: "4"
    }
  ];
  plugins = [];

  constructor(
    @inject("Layout") layout,
    @inject("findPlugin") find,
    @inject("placeholderPlugin") placeholder
  ) {
    this.find = find;
    this.placeholder = placeholder;

    //console.log(this.find, this.placeholder);
    layout
      .addComponent("topBar", Component2)
      .addComponent("leftSideBar", Component1);

    this.initPlugins();
  }

  initPlugins() {
    this.plugins = [this.placeholder(this.items[1]), this.find("s")];
  }
}
