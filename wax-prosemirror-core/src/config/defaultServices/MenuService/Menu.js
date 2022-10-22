import React, { useMemo, useContext } from 'react';
import { injectable } from 'inversify';
import { WaxContext } from '../../../WaxContext';
import ToolGroup from '../../../utilities/lib/ToolGroup';
import MenuWrapper from './MenuWrapper';

@injectable()
class Menu {
  toolGroups = [];
  config = {};
  name = '';
  constructor(config, createTools) {
    this.name = config.name;
    this.config = config;
    this.toolGroups = createTools(this.config.toolGroups);
    this.excludeIncludeTools();
    this.addToolIntoMore();
  }

  excludeIncludeTools() {
    this.toolGroups.forEach(toolGroup => {
      if (toolGroup instanceof ToolGroup) {
        toolGroup.excludeIncludeTools();
      }
    });
  }

  addToolIntoMore() {
    this.toolGroups.forEach(toolGroup => {
      if (toolGroup instanceof ToolGroup) {
        toolGroup.addToolIntoMore();
      }
    });
  }

  render() {
    return () => {
      const { activeView } = useContext(WaxContext);
      const Bar = useMemo(() => (
        // eslint-disable-next-line react/no-this-in-sfc
        <MenuWrapper items={this.toolGroups} view={activeView || {}} />
      ));
      return <>{Bar}</>;
    };
  }
}

export default Menu;
