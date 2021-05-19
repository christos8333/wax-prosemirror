import Heading2 from './Heading2';
import Heading3 from './Heading3';
import Heading4 from './Heading4';
import Service from '../../Service';

class HeadingService extends Service {
  // boot() {}

  register() {
    this.container.bind('Heading2').to(Heading2);
    this.container.bind('Heading3').to(Heading3);
    this.container.bind('Heading4').to(Heading4);
    const createNode = this.container.get('CreateNode');
    createNode({
      heading2: {
        content: 'inline*',
        group: 'block',
        defining: true,
        parseDOM: [
          {
            tag: 'h2',
          },
        ],
        toDOM(node) {
          return ['h2', 0];
        },
      },
    });
    createNode({
      heading3: {
        content: 'inline*',
        group: 'block',
        defining: true,
        parseDOM: [
          {
            tag: 'h3',
          },
        ],
        toDOM(node) {
          return ['h3', 0];
        },
      },
    });
    createNode({
      heading4: {
        content: 'inline*',
        group: 'block',
        defining: true,
        parseDOM: [
          {
            tag: 'h4',
          },
        ],
        toDOM(node) {
          return ['h4', 0];
        },
      },
    });
  }
}

export default HeadingService;
