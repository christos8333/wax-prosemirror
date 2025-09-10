import { Service } from 'wax-prosemirror-core';
import citationCallout from './schema/citationCallout';
import CitationRightArea from './components/CitationRightArea';

class CitationService extends Service {
  name = 'QuestionsService';

  boot() {
    console.log('booting');
    const layout = this.container.get('Layout');
    layout.addComponent('citationRightArea', CitationRightArea);
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
