import { Commands } from 'wax-prosemirror-utilities';
import Tools from '../../lib/Tools';

class CustomTagBlockTool extends Tools {
  title = 'Custom Tag Block';
  name = 'CustomTagBlock';

  get run() {
    return (state, dispatch, val) => {
      Commands.setBlockType(state.config.schema.nodes.customTagBlock, {
        class: val,
      })(state, dispatch);
    };
  }

  get active() {
    return (state, activeViewId, className, allTags) => {
      const isActive = Commands.customTagBlockActive(
        state.config.schema.nodes.customTagBlock,
        { class: className },
      )(state);

      const blockTags = allTags.filter(tag => {
        return tag.tagType === 'block';
      });

      const tagsActive = {};
      blockTags.forEach(tag => {
        if (
          isActive &&
          className === tag.label.replace(/ /g, '-').toLowerCase()
        ) {
          tagsActive[tag.label] = true;
        } else {
          tagsActive[tag.label] = false;
        }
      });
      return tagsActive;
    };
  }

  select = (state, activeViewId) => {
    if (activeViewId !== 'main') return false;
    return true;
  };
}

export default CustomTagBlockTool;
