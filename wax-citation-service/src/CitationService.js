import { Service } from 'wax-prosemirror-core';
import citationsDataNode from './schema/citationsDataNode';
import citationCallout from './schema/citationCallout';
import CitationRightArea from './components/CitationRightArea';
import CitationsFooterPlugin from './plugins/CitationsFooterPlugin';
import CitationsPlugin from './plugins/CitationsPlugin';

class CitationService extends Service {
  name = 'QuestionsService';

  boot() {
    console.log('booting', this.schema);
    // this.app.PmPlugins.add(
    //   'citationsPlugin',
    //   CitationsPlugin('citationsPlugin', this.app),
    // );
    this.app.PmPlugins.add(
      'citationsFooterPlugin',
      CitationsFooterPlugin('citationsFooterPlugin', this.app),
    );

    const layout = this.container.get('Layout');
    layout.addComponent('citationRightArea', CitationRightArea);
  }

  register() {
    const createNode = this.container.get('CreateNode');
    const addPortal = this.container.get('AddPortal');

    createNode({
      citations_data_node: citationsDataNode,
    });

    createNode({
      citation_callout: citationCallout,
    });
  }

  dependencies = [];
}

export default CitationService;
