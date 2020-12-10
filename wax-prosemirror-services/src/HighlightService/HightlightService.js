import Service from "../Service";
import { highlightMark } from "wax-prosemirror-schema";
import TextHighlightTool from "./TextHighlightTool";

export default class HighlightService extends Service {

    register() {
        this.container.bind('TextHighlightTool').to(TextHighlightTool);
        const createMark = this.container.get('CreateMark');
        createMark(
        {
            highlight: highlightMark,
        },
        { toWaxSchema: true },
        );
    }

}

