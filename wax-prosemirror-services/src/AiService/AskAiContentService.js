import { Service } from 'wax-prosemirror-core';
import AskAIOverlay from './components/AskAIOverlay';
import AskAiSelectionPlugin from './plugins/AskAiSelectionPlugin';
import './AskAiContent.css';

class AskAiContentService extends Service {
  name = 'AskAiContentService';

  boot() {
    this.app.PmPlugins.add(
      'askAiSelectionPlugin',
      AskAiSelectionPlugin('askAiSelectionPlugin'),
    );

    const createOverlay = this.container.get('CreateOverlay');
    const { config } = this;

    // Create the overlay
    createOverlay(
      AskAIOverlay,
      { config },
      {
        nodeType: '',
        markType: '',
        followCursor: false,
        selection: true,
      },
    );
  }

  register() {}
}

export default AskAiContentService;
