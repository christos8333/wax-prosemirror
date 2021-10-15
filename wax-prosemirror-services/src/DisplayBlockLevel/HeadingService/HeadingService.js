import Heading2 from './Heading2';
import Heading3 from './Heading3';
import Heading4 from './Heading4';
import Heading5 from './Heading5';
import Heading6 from './Heading6';
import Service from '../../Service';

class HeadingService extends Service {
  register() {
    this.container.bind('Heading2').to(Heading2);
    this.container.bind('Heading3').to(Heading3);
    this.container.bind('Heading4').to(Heading4);
    this.container.bind('Heading5').to(Heading5);
    this.container.bind('Heading6').to(Heading6);
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
    createNode({
      heading5: {
        content: 'inline*',
        group: 'block',
        defining: true,
        parseDOM: [
          {
            tag: 'h5',
          },
        ],
        toDOM(node) {
          return ['h5', 0];
        },
      },
    });
    createNode({
      heading6: {
        content: 'inline*',
        group: 'block',
        defining: true,
        parseDOM: [
          {
            tag: 'h6',
          },
        ],
        toDOM(node) {
          return ['h6', 0];
        },
      },
    });
  }
}

export default HeadingService;
