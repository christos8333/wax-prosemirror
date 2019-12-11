import React from "react";
import { v4 as uuid } from "uuid";
import { injectable, inject } from "inversify";
import { Button } from "wax-prosemirror-components";

@injectable()
export default class Tools {
  title = "title";
  content = "content";
  _isEnabled = true;
  config = {};
  pmplugins = {};

  constructor(@inject("Config") config, @inject("PmPlugins") pmplugins) {
    this.config = config;
    this.pmplugins = pmplugins;
  }

  get run() {
    return true;
  }

  get enable() {
    return true;
  }

  select() {
    return () => true;
  }

  toJSON() {
    return {
      title: this.title,
      content: this.content,
      run: this.run,
      enable: () => this.enable,
      select: this.select
    };
  }

  renderTool(view) {
    return this._isEnabled ? (
      <Button key={uuid()} item={this.toJSON()} {...view} />
    ) : null;
  }

  disableTool() {
    this._isEnabled = false;
  }

  enableTool() {
    this._isEnabled = true;
  }
}
