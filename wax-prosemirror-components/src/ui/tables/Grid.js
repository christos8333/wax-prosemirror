import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { range } from 'lodash';

const MIN_GRID_SIZE = 20;
const MAX_GRID_SIZE = 20;
const INITIAL_ACTIVE_GRID_SIZE = 1;
const CELL_SIZE = 12;
const GUTTER = 4;

const Wrapper = styled.div`
  position: relative;
  box-sizing: border-box;

  height: ${props => `${props.rows * (CELL_SIZE + GUTTER)}px`};
  width: ${props => `${props.columns * (CELL_SIZE + GUTTER)}px`};
`;

const StyledCell = styled.div.attrs(({ top, left }) => ({
  style: {
    top,
    left,
  },
}))`
  height: 12px;
  width: 12px;
  border: 1px solid gray;
  display: inline-block;
  /* transition: background 0.1s ease-in; */

  position: absolute;
`;
// top: ${props => props.top};
// left: ${props => props.left};

class Cell extends React.PureComponent {
  render() {
    console.log('render!');
    const {
      active,
      // className,
      // onMouseEnter,
      // rowIndex,
      // columnIndex,
      top,
      left,
    } = this.props;

    return (
      <StyledCell
        style={{
          background: active && 'skyblue',
        }}
        // row={rowIndex}
        // column={columnIndex}
        active={active}
        // onMouseEnter={onMouseEnter}
        top={top}
        left={left}
      />
    );
  }
}

// const Cell = props => {
//   console.log('render!');
//   const {
//     active,
//     // className,
//     // onMouseEnter,
//     // rowIndex,
//     // columnIndex,
//     top,
//     left,
//   } = props;

//   return (
//     <StyledCell
//       style={{
//         background: active && 'skyblue',
//       }}
//       // row={rowIndex}
//       // column={columnIndex}
//       active={active}
//       // onMouseEnter={onMouseEnter}
//       top={top}
//       left={left}
//     />
//   );
// };

let counter = 0;

const Grid = props => {
  const { className } = props;

  const [rows, setRows] = useState(MIN_GRID_SIZE);
  const [columns, setColumns] = useState(MIN_GRID_SIZE);

  const [activeRows, setActiveRows] = useState(INITIAL_ACTIVE_GRID_SIZE);
  const [activeColumns, setActiveColumns] = useState(INITIAL_ACTIVE_GRID_SIZE);

  const onMouseMove = e => {
    counter++;
    // console.log(counter);
    // const startTime = performance.now();
    // get position of our Wrapper within page
    const container = e.currentTarget.getBoundingClientRect();
    const containerX = e.pageX - container.left;
    const containerY = e.pageY - container.top;

    const overRow = Math.ceil(containerY / (CELL_SIZE + GUTTER));
    const overColumn = Math.ceil(containerX / (CELL_SIZE + GUTTER));

    // const endTime = performance.now();
    // console.log(endTime - startTime);

    // if (overColumn < MIN_GRID_SIZE) {
    //   setColumns(MIN_GRID_SIZE);
    // } else if (overColumn >= MIN_GRID_SIZE && overColumn < MAX_GRID_SIZE) {
    //   setColumns(overColumn + 1);
    // }

    // if (overRow < MIN_GRID_SIZE) {
    //   setRows(MIN_GRID_SIZE);
    // } else if (overRow >= MIN_GRID_SIZE && overRow < MAX_GRID_SIZE) {
    //   setRows(overRow + 1);
    // }

    setActiveRows(overRow);
    setActiveColumns(overColumn);
  };

  return (
    <>
      <Wrapper
        className={className}
        onMouseMove={onMouseMove}
        columns={columns}
        rows={rows}
      >
        {range(rows).map(rowIndex =>
          range(columns).map(columnIndex => {
            return (
              <Cell
                active={rowIndex < activeRows && columnIndex < activeColumns}
                key={`${rowIndex}:${columnIndex}`}
                rowIndex={rowIndex}
                columnIndex={columnIndex}
                // onMouseEnter={() => updateActive(rowIndex, columnIndex)}
                top={`${rowIndex * CELL_SIZE + rowIndex * GUTTER}px`}
                left={`${columnIndex * 12 + columnIndex * GUTTER}px`}
              />
            );
          }),
        )}
      </Wrapper>

      <span>
        {activeColumns} x {activeRows}
      </span>
    </>
  );
};

Grid.propTypes = {};

Grid.defaultProps = {};

export default Grid;
