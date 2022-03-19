import { ChatPlugin } from 'wax-prosemirror-plugins';
import Service from '../Service';

class ChatService extends Service {
  name = 'ChatService';

  boot() {
    this.app.PmPlugins.add('chatPlugin', ChatPlugin(this.config));
  }
}

export default ChatService;
