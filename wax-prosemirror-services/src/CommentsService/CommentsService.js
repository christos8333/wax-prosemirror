import Service from "wax-prosemirror-core/src/services/Service";
import CommentBubbleComponent from "./CommentBubbleComponent";
import { OverlayService } from "../..";

export default class CommentsService extends Service {
  name = "CommentsService";

  boot() {
    const createOverlay = this.container.get("CreateOverlay");
    createOverlay(CommentBubbleComponent, {
      markType: "",
      followCursor: false,
      selection: true
    });
  }

  register() {
    const createMark = this.container.get("CreateMark");
  }

  // dependencies = [new OverlayService()];
}
