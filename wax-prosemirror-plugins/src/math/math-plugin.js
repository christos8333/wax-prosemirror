/* eslint-disable */
import { Plugin as ProsePlugin, PluginKey } from 'prosemirror-state';
import { MathView } from './math-nodeview';
// uniquely identifies the prosemirror-math plugin
const MATH_PLUGIN_KEY = new PluginKey('prosemirror-math');
/**
 * Returns a function suitable for passing as a field in `EditorProps.nodeViews`.
 * @param displayMode TRUE for block math, FALSE for inline math.
 * @see https://prosemirror.net/docs/ref/#view.EditorProps.nodeViews
 */
export function createMathView(displayMode) {
  return (node, view, getPos) => {
    /** @todo is this necessary?
     * Docs says that for any function proprs, the current plugin instance
     * will be bound to `this`.  However, the typings don't reflect this.
     */
    console.log('ho', MATH_PLUGIN_KEY);

    let pluginState = MATH_PLUGIN_KEY.getState(view.state);
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
      MATH_PLUGIN_KEY,
      () => {
        nodeViews.splice(nodeViews.indexOf(nodeView));
      },
    );
    nodeViews.push(nodeView);
    return nodeView;
  };
}
let mathPluginSpec = {
  key: MATH_PLUGIN_KEY,
  state: {
    init(config, instance) {
      return {
        macros: {},
        activeNodeViews: [],
        prevCursorPos: 0,
      };
    },
    apply(tr, value, oldState, newState) {
      // produce updated state field for this plugin
      return {
        // these values are left unchanged
        activeNodeViews: value.activeNodeViews,
        macros: value.macros,
        // update with the second-most recent cursor pos
        prevCursorPos: oldState.selection.from,
      };
    },
    /** @todo (8/21/20) implement serialization for math plugin */
    // toJSON(value) { },
    // fromJSON(config, value, state){ return {}; }
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
