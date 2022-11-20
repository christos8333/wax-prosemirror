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

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { withTheme } from 'styled-components';

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
  const { x, y, selected, theme } = props;
  const style = {
    left: x + 'px',
    top: y + 'px',
    width: CELL_SIZE + 'px',
    height: CELL_SIZE + 'px',
    border: `1px solid ${theme.colorBorder}`,
    boxSizing: 'border-box',
    position: 'absolute',
    zIndex: 2,
  };

  if (selected) style.background = theme.colorPrimary;
  return <div style={style} />;
};

GridCell.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
};

const ThemedCell = withTheme(GridCell);

const TableGridSizeEditor = props => {
  let _ex = 0;
  let _ey = 0;
  let _mx = 0;
  let _my = 0;
  let _rafID = 0;
  let _ref = null;
  let _entered = true;

  const [colsRows, setColsRows] = useState({ rows: 1, cols: 1 });

  useEffect(() => {
    _entered = false;
    return () => {
      if (_entered) {
        document.removeEventListener('mousemove', _onMouseMove, true);
      }
      _rafID && cancelAnimationFrame(_rafID);
    };
  }, []);

  const _onMouseEnter = e => {
    const node = e.currentTarget;
    if (node instanceof HTMLElement) {
      const rect = fromHTMlElement(node);
      const mx = Math.round(e.clientX);
      const my = Math.round(e.clientY);
      _ex = rect.x;
      _ey = rect.y;
      _mx = mx;
      _my = my;
      if (!_entered) {
        _entered = true;
        document.addEventListener('mousemove', _onMouseMove, true);
      }
    }
  };

  const _onMouseMove = e => {
    const el = _ref && ReactDOM.findDOMNode(_ref);
    const elRect = el ? htmlElementToRect(el) : null;
    const mouseRect = fromXY(e.screenX, e.screenY, 10);

    if (elRect && mouseRect && isIntersected(elRect, mouseRect, 50)) {
      // This prevents `PopUpManager` from collapsing the editor.
      e.preventDefault();
      e.stopImmediatePropagation();
    }

    const _updateGridSize = () => {
      _rafID = 0;
      const mx = _mx;
      const my = _my;
      const x = mx - _ex;
      const y = my - _ey;
      const rr = clamp(1, Math.ceil(y / (CELL_SIZE + GUTTER_SIZE)), MAX_SIZE);
      const cc = clamp(1, Math.ceil(x / (CELL_SIZE + GUTTER_SIZE)), MAX_SIZE);
      const { rows, cols } = colsRows;
      if (rows !== rr || cols !== cc) {
        setColsRows({ rows: rr, cols: cc });
      }
    };

    const mx = Math.round(e.clientX);
    const my = Math.round(e.clientY);
    if (mx !== _mx || my !== _my) {
      _mx = mx;
      _my = my;
      _rafID && window.cancelAnimationFrame(_rafID);
      _rafID = window.requestAnimationFrame(_updateGridSize);
    }
  };
  const _onRef = ref => {
    _ref = ref;
  };

  const _onMouseDown = e => {
    e.preventDefault();
    props.onGridSelect(colsRows);
  };

  const { rows, cols } = colsRows;
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
        <ThemedCell
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

  const infoStyle = {
    height: '20px',
    fontSize: '14px',
    marginLeft: '5px',
  };

  return (
    <div style={wrapperStyle} ref={_onRef}>
      <div
        onMouseDown={_onMouseDown}
        onMouseEnter={_onMouseEnter}
        style={bodyStyle}
      >
        {cells}
      </div>
      <div style={infoStyle}>
        {rows} X {cols}
      </div>
    </div>
  );
};

TableGridSizeEditor.propTypes = {
  onGridSelect: PropTypes.func.isRequired,
};

export default TableGridSizeEditor;
