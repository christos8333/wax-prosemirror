import React from "react";
import { v4 as uuid } from "uuid";
import { isEmpty } from "lodash";
import { injectable, inject } from "inversify";
import { Button } from "wax-prosemirror-components";

@injectable()
export default class Tools {
  title = "title";
  content = "content";
  _isDisplayed = true;
  hideOnToolbar = false;
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
    return () => true;
  }

  select() {
    return () => true;
  }

  get active() {
    return () => false;
  }

  toJSON() {
    return {
      title: this.title,
      content: this.content,
      active: this.active,
      run: this.run,
      enable: this.enable,
      select: this.select
    };
  }

  renderTool(view) {
    if (isEmpty(view)) return null;

    return this._isDisplayed ? (
      <Button key={uuid()} item={this.toJSON()} view={view} />
    ) : null;
  }

  disableTool() {
    this._isDisplayed = false;
  }

  enableTool() {
    this._isDisplayed = true;
  }
}
