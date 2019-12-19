import Service from "wax-prosemirror-core/src/services/Service";
import placeholderPlugin from "./pmPlugins/placeholderPlugin";
const PLUGIN_KEY = "imagePlaceHolder";

const parseTracks = str => {
  if (!str) {
    return [];
  }
  let tracks;
  try {
    tracks = JSON.parse(str);
  } catch (error) {
    return [];
  }
  if (!Array.isArray(tracks)) {
    return [];
  }
  return tracks.filter(
    (
      track // ensure required fields are present
    ) =>
      track.hasOwnProperty("user") &&
      track.hasOwnProperty("username") &&
      track.hasOwnProperty("date")
  );
};

export default class PlaceholderService extends Service {
  name = "PlaceholderService";

  boot() {
    this.app.PmPlugins.add(PLUGIN_KEY, placeholderPlugin(PLUGIN_KEY));
  }

  register() {
    this.container
      .bind("schema")
      .toConstantValue({
        paragraph: {
          group: "block",
          content: "inline*",
          attrs: {
            class: { default: "paragraph" }
          },
          parseDOM: {
            tag: "p.paragraph",
            getAttrs(hook, next) {
              Object.assign(hook, {
                class: hook.dom.getAttribute("class")
              });
              next();
            }
          },
          toDOM(hook, next) {
            const attrs = { class: hook.node.attrs.class };

            hook.value = ["p", attrs, 0];
            next();
          }
        }
      })
      .whenTargetNamed("node");

    this.container
      .bind("schema")
      .toConstantValue({
        paragraph: {
          group: "block",
          content: "inline*",
          attrs: {
            track: { default: [] }
          },
          parseDOM: {
            tag: "p.paragraph",
            getAttrs(hook, next) {
              Object.assign(hook, {
                track: parseTracks(hook.dom.dataset.track)
              });
              next();
            }
          },
          toDOM(hook, next) {
            Object.assign(hook.value[1], {
              "data-track": JSON.stringify(hook.node.attrs.track)
            });
            next();
          }
        }
      })
      .whenTargetNamed("node");
  }
}
