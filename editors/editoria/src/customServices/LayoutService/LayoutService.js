import { Service } from "wax-prosemirror-core";
import EditoriaLayout from "./EditoriaLayout";
export class LayoutService extends Service {
  boot() {
    const myLayout = this.container.get("Layout");
    myLayout.setLayout(EditoriaLayout);
  }
}
