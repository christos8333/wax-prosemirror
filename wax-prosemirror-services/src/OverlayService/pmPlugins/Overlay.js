import React from "react";
import { render as renderReact } from "react-dom";
import OverlayComponent from "../OverlayComponent";

export default class Overlay {
  constructor(view) {
    this.tooltip = document.createElement("div");
    this.tooltip.className = "fds";
    console.log(view.dom);

    view.dom.parentNode.appendChild(this.tooltip);

    this.update(view, null);
  }

  render(view) {
    const { state } = view;
    const { doc, selection, schema } = state;
    const markType = schema.marks.link;
    if (!markType) return;

    const { from, to, empty } = view.state.selection;

    const start = view.coordsAtPos(from);
    const end = view.coordsAtPos(to);
    const box = 0; //this.tooltip.getBoundingClientRect();
    const left = Math.max((start.left + end.left) / 2, start.left + 3);

    const leftSpacing = `${left - box}px`;
    const bottomSpacing = `${box - start.top}px`;
    const numberOfCharactersInSelection = to - from;

    return (
      <OverlayComponent
        display={empty ? "none" : undefined}
        left={leftSpacing}
        bottom={bottomSpacing}
      >
        {numberOfCharactersInSelection}
      </OverlayComponent>
    );
  }

  update(view, lastState) {
    const { state } = view;

    const { doc, selection, schema } = state;
    const markType = schema.marks.link;
    if (!markType) return;
    const { from, to } = selection;

    const domFound = view.domAtPos(from);
    if (!domFound) {
      this.destroy();
      return;
    }

    // debugger;
    // const anchorEl = lookUpElement(domFound.node, el => el.nodeName === "A");
    // if (!anchorEl) {
    //   this.destroy();
    //   return;
    // }

    //if (areStatesEqual(state, lastState)) return;

    // Don't do anything if the document/selection didn't change
    if (
      lastState &&
      lastState.doc.eq(state.doc) &&
      lastState.selection.eq(state.selection)
    )
      return;

    //const tooltipComponent = this.render(view);
    console.log(view.dom);

    //renderReact(tooltipComponent, view.dom);
  }

  destroy() {
    //this.tooltip.remove();
  }
}
