import React, { Component } from "react";
import { EditorView } from "prosemirror-view";
import "./linktooltip.css";

class LinkToolTip extends React.Component {
  render() {
    const { href, onEdit, onRemove } = this.props;
    return (
      <div className="wax-link-tooltip">
        <div className="wax-link-tooltip-body">
          <div className="wax-link-tooltip-row">Link tooltip</div>
        </div>
      </div>
    );
  }
}

export default LinkToolTip;
