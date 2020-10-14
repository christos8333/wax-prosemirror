/* eslint-disable */
import { Plugin as ProsePlugin, PluginKey } from 'prosemirror-state';
import { MathView } from './math-nodeview';
/**
 * Returns a function suitable for passing as a field in `EditorProps.nodeViews`.
 * @param displayMode TRUE for block math, FALSE for inline math.
 * @see https://prosemirror.net/docs/ref/#view.EditorProps.nodeViews
 */
function createMathView(displayMode) {
  return (node, view, getPos) => {
    /** @todo is this necessary?
     * Docs says that for any function proprs, the current plugin instance
     * will be bound to `this`.  However, the typings don't reflect this.
     */
    let pluginState = mathPluginKey.getState(view.state);
    if (!pluginState) {
      throw new Error('no math plugin!');
    }
    let nodeViews = pluginState.activeNodeViews;
    // set up NodeView
    let nodeView = new MathView(
      node,
      view,
      getPos,
      { katexOptions: { displayMode, macros: pluginState.macros } },
      () => {
        nodeViews.splice(nodeViews.indexOf(nodeView));
      },
    );
    nodeViews.push(nodeView);
    return nodeView;
  };
}
let mathPluginKey = new PluginKey('prosemirror-math');
let mathPluginSpec = {
  key: mathPluginKey,
  state: {
    init(config, instance) {
      return {
        macros: {},
        activeNodeViews: [],
      };
    },
    apply(tr, value, oldState, newState) {
      /** @todo (8/21/20)
       * since new state has not been fully applied yet, we don't yet have
       * information about any new MathViews that were created by this transaction.
       * As a result, the cursor position may be wrong for any newly created math blocks.
       */
      let pluginState = mathPluginKey.getState(oldState);
      if (pluginState) {
        for (let mathView of pluginState.activeNodeViews) {
          mathView.updateCursorPos(newState);
        }
      }
      return value;
    },
  },
  props: {
    nodeViews: {
      math_inline: createMathView(false),
      math_display: createMathView(true),
    },
  },
};
const mathPlugin = new ProsePlugin(mathPluginSpec);

export default mathPlugin;
