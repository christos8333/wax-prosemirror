import { Service } from 'wax-prosemirror-core';
import ContentUpdatePlugin, {
  updateContent,
} from './plugins/ContentUpdatePlugin';

class ContentUpdateService extends Service {
  name = 'ContentUpdateService';

  boot() {
    const plugin = ContentUpdatePlugin(this.config);
    this.app.PmPlugins.add('contentUpdatePlugin', plugin);

    if (!this.app.updateContent) {
      this.app.updateContent = (htmlContent, view) => {
        updateContent(htmlContent, this.app, view);
      };
    }
  }
}

export default ContentUpdateService;
