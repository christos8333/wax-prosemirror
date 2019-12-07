import React from "react";
import { v4 as uuid } from "uuid";
import { injectable } from "inversify";
import { Button } from "wax-prosemirror-components";

@injectable()
export default class Tools {
  title = "title";
  content = "content";

  _isEnabled = true;

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

  disable() {
    this._isEnabled = false;
  }

  enable() {
    this._isEnabled = true;
  }
}
