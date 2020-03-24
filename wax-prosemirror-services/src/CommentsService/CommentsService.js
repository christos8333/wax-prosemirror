import Service from "wax-prosemirror-core/src/services/Service";
import { commentMark } from "wax-prosemirror-schema";
import {
  CommentComponent,
  CommentBubbleComponent
} from "wax-prosemirror-components";
import { OverlayService } from "../..";

export default class CommentsService extends Service {
  name = "CommentsService";

  boot() {
    const createOverlay = this.container.get("CreateOverlay");
    const layout = this.container.get("Layout");
    createOverlay(CommentBubbleComponent, {
      markType: "",
      followCursor: false,
      selection: true
    });

    // layout.addComponent("commentsArea", CommentComponent);
  }

  register() {
    const createMark = this.container.get("CreateMark");
    createMark({
      comment: commentMark
    });
  }
}
