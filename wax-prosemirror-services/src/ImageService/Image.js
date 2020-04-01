import React from "react";
import { v4 as uuid } from "uuid";
import { isEmpty } from "lodash";
import { injectable } from "inversify";
import { icons, ImageUpload } from "wax-prosemirror-components";
import Tools from "../lib/Tools";
import { Commands } from "wax-prosemirror-utilities";
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
      return Commands.canInsert(state.config.schema.nodes.image)(state);
    };
  }

  renderTool(view) {
    if (isEmpty(view)) return null;
    const upload = fileUpload(
      view,
      this.config.get("fileUpload"),
      this.pmplugins.get("imagePlaceHolder")
    );
    return this._isDisplayed ? (
      <ImageUpload key={uuid()} item={this.toJSON()} fileUpload={upload} />
    ) : null;
  }
}
