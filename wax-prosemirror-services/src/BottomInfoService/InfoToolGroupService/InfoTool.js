import { injectable, inject } from 'inversify';
import { ToolGroup } from 'wax-prosemirror-core';

@injectable()
class InfoToolGroup extends ToolGroup {
  tools = [];
  constructor(
    @inject('CounterInfoTool') counterinfotool,
    @inject('ShortCutsInfoTool') shortcutsinfotool,
  ) {
    super();
    this.tools = [shortcutsinfotool, counterinfotool];
  }
}

export default InfoToolGroup;
