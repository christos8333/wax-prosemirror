import { Service } from 'wax-prosemirror-core';
import { authorNode } from 'wax-prosemirror-schema';
import Author from './Author';

class AuthorService extends Service {
  // boot() {}

  register() {
    this.container.bind('Author').to(Author);
    const createNode = this.container.get('CreateNode');
    createNode(
      {
        author: authorNode,
      },
      { toWaxSchema: true },
    );
  }
}

export default AuthorService;
