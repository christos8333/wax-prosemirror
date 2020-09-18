/**
 * Adapted from https://github.com/chanzuckerberg/czi-prosemirror/blob/master/src/ui/TableGridSizeEditor.js
 *
 * TO DO -- Implement a gdocs-style CSS only solution to dramatically cut back on renders
 */

/* eslint-disable react/jsx-handler-names */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-find-dom-node */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-template */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-classes-per-file */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const clamp = (min, val, max) => {
  if (val < min) {
    return min;
  }
  if (val > max) {
    return max;
  }
  return val;
};

const isIntersected = (r1, r2, padding) => {
  const pp = padding || 0;
  return !(
    r2.x - pp > r1.x + r1.w + pp ||
    r2.x + r2.w + pp < r1.x - pp ||
    r2.y - pp > r1.y + r1.h + pp ||
    r2.y + r2.h + pp < r1.y - pp
  );
};

const fromXY = (x, y, padding = 0) => {
  return {
    x: x - padding,
    y: y - padding,
    w: padding * 2,
    h: padding * 2,
  };
};

const fromHTMlElement = el => {
  const display = document.defaultView.getComputedStyle(el).display;
  if (display === 'contents' && el.children.length === 1) {
    // el has no layout at all, use its children instead.
    return fromHTMlElement(el.children[0]);
  }
  const rect = el.getBoundingClientRect();
  return {
    x: rect.left,
    y: rect.top,
    w: rect.width,
    h: rect.height,
  };
};

const htmlElementToRect = el => {
  const rect = el.getBoundingClientRect();
  return {
    x: rect.left,
    y: rect.top,
    w: rect.width,
    h: rect.height,
  };
};

const GUTTER_SIZE = 5;
const CELL_SIZE = 16;
const MAX_SIZE = 20;

const GridCell = props => {
  const { x, y, selected } = props;
  const style = {
    left: x + 'px',
    top: y + 'px',
    width: CELL_SIZE + 'px',
    height: CELL_SIZE + 'px',
    border: '1px solid gray',
    boxSizing: 'border-box',
    position: 'absolute',
    zIndex: 2,
  };

  if (selected) style.background = 'skyblue';
  return <div style={style} />;
};

GridCell.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
};

class TableGridSizeEditor extends React.PureComponent {
  _ex = 0;
  _ey = 0;
  _mx = 0;
  _my = 0;
  _rafID = 0;
  _ref = null;
  _entered = false;

  constructor(props) {
    super(props);
    this.state = {
      rows: 1,
      cols: 1,
    };
  }

  componentWillUnmount() {
    if (this._entered) {
      document.removeEventListener('mousemove', this._onMouseMove, true);
    }
    this._rafID && cancelAnimationFrame(this._rafID);
  }

  _onRef = ref => {
    this._ref = ref;
  };

  _onMouseEnter = e => {
    const node = e.currentTarget;
    if (node instanceof HTMLElement) {
      const rect = fromHTMlElement(node);
      const mx = Math.round(e.clientX);
      const my = Math.round(e.clientY);
      this._ex = rect.x;
      this._ey = rect.y;
      this._mx = mx;
      this._my = my;
      if (!this._entered) {
        this._entered = true;
        document.addEventListener('mousemove', this._onMouseMove, true);
      }
    }
  };

  _onMouseMove = e => {
    const el = this._ref && ReactDOM.findDOMNode(this._ref);
    const elRect = el ? htmlElementToRect(el) : null;
    const mouseRect = fromXY(e.screenX, e.screenY, 10);

    if (elRect && mouseRect && isIntersected(elRect, mouseRect, 50)) {
      // This prevents `PopUpManager` from collapsing the editor.
      e.preventDefault();
      e.stopImmediatePropagation();
    }

    const mx = Math.round(e.clientX);
    const my = Math.round(e.clientY);
    if (mx !== this._mx || my !== this._my) {
      this._mx = mx;
      this._my = my;
      this._rafID && cancelAnimationFrame(this._rafID);
      this._rafID = requestAnimationFrame(this._updateGridSize);
    }
  };

  _updateGridSize = () => {
    this._rafID = 0;
    const mx = this._mx;
    const my = this._my;
    const x = mx - this._ex;
    const y = my - this._ey;
    const rr = clamp(1, Math.ceil(y / (CELL_SIZE + GUTTER_SIZE)), MAX_SIZE);
    const cc = clamp(1, Math.ceil(x / (CELL_SIZE + GUTTER_SIZE)), MAX_SIZE);
    const { rows, cols } = this.state;
    if (rows !== rr || cols !== cc) {
      this.setState({ rows: rr, cols: cc });
    }
  };

  _onMouseDown = e => {
    e.preventDefault();
    this.props.onGridSelect(this.state);
  };

  render() {
    const { rows, cols } = this.state;
    let rr = Math.max(5, rows);
    let cc = Math.max(5, cols);
    if (rr === rows) {
      rr = Math.min(MAX_SIZE, rr + 1);
    }
    if (cc === cols) {
      cc = Math.min(MAX_SIZE, cc + 1);
    }
    const cells = [];
    let ii = 0;
    let y = 0;
    let w = 0;
    let h = 0;
    while (ii < rr) {
      y += GUTTER_SIZE;
      let jj = 0;
      let x = 0;
      while (jj < cc) {
        x += GUTTER_SIZE;
        const selected = ii < rows && jj < cols;
        cells.push(
          <GridCell
            key={`${String(ii)}-${String(jj)}`}
            selected={selected}
            x={x}
            y={y}
          />,
        );
        x += CELL_SIZE;
        w = x + GUTTER_SIZE;
        jj++;
      }
      y += CELL_SIZE;
      h = y + GUTTER_SIZE;
      ii++;
    }

    const wrapperStyle = {
      background: '#fff',
      border: '1px solid gray',
      boxSizing: 'border-box',
      display: 'block',
      position: 'absolute',
      zIndex: 2,
    };

    const bodyStyle = {
      width: w + 'px',
      height: h + 'px',
      position: 'relative',
    };

    return (
      <div style={wrapperStyle} ref={this._onRef}>
        <div
          onMouseDown={this._onMouseDown}
          onMouseEnter={this._onMouseEnter}
          style={bodyStyle}
        >
          {cells}
        </div>
        <div>
          {rows} X {cols}
        </div>
      </div>
    );
  }
}

TableGridSizeEditor.propTypes = {
  onGridSelect: PropTypes.func.isRequired,
};

export default TableGridSizeEditor;
