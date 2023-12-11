import { Service } from 'wax-prosemirror-core';
import Heading2 from './Heading2';
import Heading3 from './Heading3';
import Heading4 from './Heading4';
import Heading5 from './Heading5';
import Heading6 from './Heading6';

class HeadingService extends Service {
  register() {
    this.container.bind('Heading2').toDynamicValue(() => {
      return new Heading2(this.config.get('config.OENContainersService'));
    });
    this.container.bind('Heading3').toDynamicValue(() => {
      return new Heading3(this.config.get('config.OENContainersService'));
    });
    this.container.bind('Heading4').toDynamicValue(() => {
      return new Heading4(this.config.get('config.OENContainersService'));
    });
    this.container.bind('Heading5').toDynamicValue(() => {
      return new Heading5(this.config.get('config.OENContainersService'));
    });
    this.container.bind('Heading6').toDynamicValue(() => {
      return new Heading6(this.config.get('config.OENContainersService'));
    });
    const createNode = this.container.get('CreateNode');
    createNode(
      {
        heading2: {
          content: 'inline*',
          group: 'block',
          defining: true,
          parseDOM: [
            {
              tag: 'h2',
            },
          ],
          toDOM(hook, next) {
            const attrs = {};
            // eslint-disable-next-line no-param-reassign
            hook.value = ['h2', attrs, 0];
            next();
          },
        },
      },
      { toWaxSchema: true },
    );
    createNode(
      {
        heading3: {
          content: 'inline*',
          group: 'block',
          defining: true,
          parseDOM: [
            {
              tag: 'h3',
            },
          ],
          toDOM(hook, next) {
            const attrs = {};
            // eslint-disable-next-line no-param-reassign
            hook.value = ['h3', attrs, 0];
            next();
          },
        },
      },
      { toWaxSchema: true },
    );
    createNode(
      {
        heading4: {
          content: 'inline*',
          group: 'block',
          defining: true,
          parseDOM: [
            {
              tag: 'h4',
            },
          ],
          toDOM(hook, next) {
            const attrs = {};
            // eslint-disable-next-line no-param-reassign
            hook.value = ['h4', attrs, 0];
            next();
          },
        },
      },
      { toWaxSchema: true },
    );
    createNode(
      {
        heading5: {
          content: 'inline*',
          group: 'block',
          defining: true,
          parseDOM: [
            {
              tag: 'h5',
            },
          ],
          toDOM(hook, next) {
            const attrs = {};
            // eslint-disable-next-line no-param-reassign
            hook.value = ['h5', attrs, 0];
            next();
          },
        },
      },
      { toWaxSchema: true },
    );
    createNode(
      {
        heading6: {
          content: 'inline*',
          group: 'block',
          defining: true,
          parseDOM: [
            {
              tag: 'h6',
            },
          ],
          toDOM(hook, next) {
            const attrs = {};
            // eslint-disable-next-line no-param-reassign
            hook.value = ['h6', attrs, 0];
            next();
          },
        },
      },
      { toWaxSchema: true },
    );
  }
}

export default HeadingService;
