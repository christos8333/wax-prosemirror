import { headingNode } from 'wax-prosemirror-schema';
import Heading1 from './Heading1';
import Heading2 from './Heading2';
import Heading3 from './Heading3';
import Service from '../../Service';

class HeadingService extends Service {
  // boot() {}

  register() {
    this.container.bind('Heading1').to(Heading1);
    this.container.bind('Heading2').to(Heading2);
    this.container.bind('Heading3').to(Heading3);
    const createNode = this.container.get('CreateNode');
    createNode(
      {
        heading: headingNode,
      },
      { toWaxSchema: true },
    );
  }
}

export default HeadingService;
