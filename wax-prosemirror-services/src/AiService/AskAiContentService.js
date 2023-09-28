import { Service } from 'wax-prosemirror-core';
import AskAIOverlay from './components/AskAIOverlay';
import AskAiSelectionPlugin from './plugins/AskAiSelectionPlugin';
import AiToolGroupService from './AiToolGroupService/AiToolGroupService';
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

  dependencies = [new AiToolGroupService()];
}

export default AskAiContentService;
