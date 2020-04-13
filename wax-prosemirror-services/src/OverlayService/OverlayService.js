import Service from "wax-prosemirror-core/src/services/Service";
import OverlayComponent from "./OverlayComponent";

export default class OverlayService extends Service {
  boot() {}

  register() {
    this.container.bind("CreateOverlay").toFactory(context => {
      return (Component, componentProps, options) => {
        const layout = context.container.get("Layout");
        layout.addComponent(
          "waxOverlays",
          OverlayComponent(Component, options),
          componentProps
        );
      };
    });
  }
}
