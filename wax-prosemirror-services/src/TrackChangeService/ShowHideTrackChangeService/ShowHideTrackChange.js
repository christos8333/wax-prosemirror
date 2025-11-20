/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { injectable } from 'inversify';
import { each } from 'lodash';
import { Tools } from 'wax-prosemirror-core';

@injectable()
class ShowHideTrackChange extends Tools {
  title = 'Show/Hide Changes';
  icon = 'showTrack';
  label = 'Show suggestions';
  name = 'ShowHideTrackChange';
  _showHidden = false;

  get run() {
    return (state, dispatch, view, context) => {
      const hideShowPlugin = this.pmplugins.get('hideShowPlugin');
      if (!hideShowPlugin) return;

      // Toggle the show/hide state
      this._showHidden = !this._showHidden;

      // Update the plugin
      if (hideShowPlugin.props && hideShowPlugin.props.setHideShow) {
        hideShowPlugin.props.setHideShow(this._showHidden);
      }

      // Dispatch to all views to trigger re-render
      if (context && context.pmViews) {
        each(context.pmViews, singleView => {
          if (singleView && singleView.dispatch) {
            singleView.dispatch(singleView.state.tr);
          }
        });
      }
    };
  }

  select = (state, activeViewId, activeView) => {
    return true;
  };

  get active() {
    return state => {
      return this._showHidden;
    };
  }
}

export default ShowHideTrackChange;
