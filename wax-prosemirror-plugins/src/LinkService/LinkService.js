import Service from "wax-prosemirror-core/src/services/Service";
import LinkComponent from "./LinkComponent";
import LinkTool from "./LinkTool";

export default class LinkService extends Service {
  name = "LinkPlugin";

  boot() {
    //Set Layout
    const layout = this.container.get("Layout");
    layout.addComponent("editorOverlays", LinkComponent);
  }

  register() {
    this.container.bind("schema").toConstantValue({
      link: {
        attrs: {
          href: { default: null },
          rel: { default: "" },
          target: { default: "blank" },
          title: { default: null }
        },
        inclusive: false,
        parseDOM: {
          tag: "a[href]",
          getAttrs: (hook, next) => {
            const href = hook.dom.getAttribute("href");
            const target = href && href.indexOf("#") === 0 ? "" : "blank";
            Object.assign(hook, {
              href: hook.dom.getAttribute("href"),
              title: hook.dom.getAttribute("title"),
              target
            });
            next();
          }
        },
        toDOM(hook, next) {
          hook.value = ["a", node.attrs, 0];
          next();
        }
      }
    });
    this.container.bind("Link").to(LinkTool);
  }
}
