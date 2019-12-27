import React from "react";
import { v4 as uuid } from "uuid";
import Tools from "../lib/Tools";
import { injectable } from "inversify";
import { icons, ImageUpload } from "wax-prosemirror-components";
import { canInsert } from "../lib/Utils";
import fileUpload from "./fileUpload";

@injectable()
export default class Image extends Tools {
  title = "Insert image";
  content = icons.image;

  get run() {
    return () => true;
  }

  get enable() {
    return state => {
      return canInsert(state.config.schema.nodes.image)(state);
    };
  }

  renderTool(view) {
    if (!view) return null;
    const upload = fileUpload(
      view,
      this.config.get("fileUpload"),
      this.pmplugins.get("imagePlaceHolder")
    );
    return this._isEnabled ? (
      <ImageUpload key={uuid()} item={this.toJSON()} fileUpload={upload} />
    ) : null;
  }
}
