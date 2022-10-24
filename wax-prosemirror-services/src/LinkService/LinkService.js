import { Service } from 'wax-prosemirror-core';
import { LinkComponent } from 'wax-prosemirror-components';
import linkMark from './schema/linkMark';
import LinkTool from './LinkTool';
import linkRule from './LinkInputRule';

export default class LinkService extends Service {
  name = 'LinkService';

  boot() {
    const createOverlay = this.container.get('CreateOverlay');
    const createRule = this.container.get('CreateRule');
    const {
      schema: { schema },
    } = this.app;
    createOverlay(
      LinkComponent,
      {},
      {
        nodeType: '',
        markType: 'link',
        followCursor: false,
        selection: false,
      },
    );
    createRule([linkRule(schema.marks.link)]);
  }

  register() {
    this.container.bind('Link').to(LinkTool);
    const createMark = this.container.get('CreateMark');
    createMark(
      {
        link: linkMark,
      },
      { toWaxSchema: true },
    );
  }
}
