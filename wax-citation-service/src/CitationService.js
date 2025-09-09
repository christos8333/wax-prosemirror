import { Service } from 'wax-prosemirror-core';
import citationCallout from './schema/citationCallout';

class CitationService extends Service {
  name = 'QuestionsService';

  boot() {
    console.log('in boot');
  }

  register() {
    const createNode = this.container.get('CreateNode');
    const addPortal = this.container.get('AddPortal');

    createNode({
      citation_callout: citationCallout,
    });
  }

  dependencies = [];
}

export default CitationService;
