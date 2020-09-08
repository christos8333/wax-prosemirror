import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { range } from 'lodash';

import GridCell from './GridCell';

const INITIAL_GRID_SIZE = 5;
const CELL_SIZE = 12;
const GUTTER = 4;

const Wrapper = styled.div`
  /* flex-direction: column; */
  position: relative;
  /* height: 100px;
  width: 100px; */
  /* background: turquoise; */

  border: 1px solid gray;
  border-radius: 5px;

  box-sizing: border-box;

  height: ${props => `${16 + props.rows * (CELL_SIZE + GUTTER)}px`};
  width: ${props => `${props.columns * (CELL_SIZE + GUTTER)}px`};
  padding: 8px;
`;

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledGridCell = styled(GridCell)`
  margin: 1px;
`;

// .attrs(props => ({
//   style: {
//     background: props.active && 'skyblue',
//   },
// }))
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

/* ${props => props.active && `background: skyblue;`} */
// const Cell = props => {
//   const { active, className, onMouseEnter, rowIndex, columnIndex } = props;

//   return (
//     <StyledCell
//       row={rowIndex}
//       column={columnIndex}
//       active={active}
//       className={className}
//       onMouseEnter={onMouseEnter}
//     />
//   );
// };

class Cell extends React.PureComponent {
  render() {
    // console.log('render!');
    const {
      active,
      // className,
      onMouseEnter,
      // rowIndex,
      // columnIndex,
      top,
      left,
    } = this.props;

    // if (rowIndex === 0 && columnIndex === 0) {
    //   console.log(this.props);
    // }

    return (
      <StyledCell
        style={{
          background: active && 'skyblue',
        }}
        // row={rowIndex}
        // column={columnIndex}
        active={active}
        // className={className}
        onMouseEnter={onMouseEnter}
        top={top}
        left={left}
      />
    );
  }
}

const Row = props => {
  const { activeRows, activeColumns, columns, rowIndex, updateActive } = props;

  return (
    <StyledRow>
      {range(columns).map(columnIndex => (
        <StyledGridCell
          active={rowIndex < activeRows && columnIndex < activeColumns}
          onMouseEnter={() => updateActive(rowIndex + 1, columnIndex + 1)}
          key={columnIndex}
        />
      ))}
    </StyledRow>
  );
};

const Grid = props => {
  const { className, initialRows, initialColumns } = props;

  const [rows, setRows] = useState(INITIAL_GRID_SIZE);
  const [columns, setColumns] = useState(INITIAL_GRID_SIZE);

  const [activeRows, setActiveRows] = useState(1);
  const [activeColumns, setActiveColumns] = useState(1);

  // const [state, setState] = useState({
  //   rows: 5,
  //   columns: 5,
  //   activeRows: 1,
  //   activeColumns: 1,
  // });

  const updateActive = (rowPosition, columnPosition) => {
    console.log('run!');
    // console.log(rowPosition, columnPosition);
    // console.log(rowPosition, rows);
    // expand
    // const newRowCount =
    //   rowPosition === rows && rowPosition < 20 ? rows + 1 : rows;
    // setRows(newRowCount);
    // rowPosition === rows && rowPosition < 20 && setRows(rows + 1);
    // const newColumnCount =
    //   columnPosition === columns && columnPosition < 20 ? columns + 1 : columns;
    // setColumns(newColumnCount);
    // columnPosition === columns &&
    //   columnPosition < 20 &&
    //   setColumns(columns + 1);
    setActiveRows(rowPosition);
    // setActiveColumns(columnPosition);
    // contract
    // rowPosition < rows && rows < 20 && rowPosition > 5 && setRows(rows - 1);
    // setState({
    //   activeRows: rowPosition,
    //   activeColumns: columnPosition,
    //   rows: rowPosition === rows && rowPosition < 20 ? rows + 1 : rows,
    //   columns,
    // });
  };

  // console.log('render me');

  // const { rows, columns, activeRows, activeColumns } = state;

  // return (
  //   <Wrapper className={className}>
  //     {range(rows).map(rowIndex => {
  //       return (
  //         <Row
  //           activeRows={activeRows}
  //           activeColumns={activeColumns}
  //           columns={columns}
  //           rowIndex={rowIndex}
  //           key={rowIndex}
  //           updateActive={updateActive}
  //         />
  //       );
  //     })}

  //     <span>
  //       {activeColumns} x {activeRows}
  //     </span>
  //   </Wrapper>
  // );

  const onMouseMove = e => {
    // console.log(e.nativeEvent.offsetX);
    // const { offsetX, offsetY } = e.nativeEvent;
    // console.log(offsetX, offsetY);

    // console.log(e.clientX, e.clientY);

    // console.log(e_offsetX, e_offsetY);

    // get position of our Wrapper within page
    const container = e.currentTarget.getBoundingClientRect();
    const containerX = e.pageX - container.left;
    const containerY = e.pageY - container.top;

    const overRow = Math.ceil(containerY / (CELL_SIZE + GUTTER));
    // console.log('offsetY', offsetY, 'overRow', overRow);

    const overColumn = Math.ceil(containerX / (CELL_SIZE + GUTTER));

    setActiveRows(overRow);
    setActiveColumns(overColumn);

    // overRow === rows && overRow < 20 && setRows(rows + 1);
    // overRow + 1 < rows && overRow > 3 && setRows(rows - 1);

    if (overColumn < 5) {
      setColumns(5);
    } else if (overColumn >= 5 && overColumn <= 20) {
      setColumns(overColumn + 1);
    }
    // overColumn < 5 && setColumns(5);
    // overColumn >= 5 && overColumn <= 20 && setColumns(overColumn + 1);

    if (overRow < 5) {
      setRows(5);
    } else if (overRow >= 5 && overRow <= 20) {
      setRows(overRow + 1);
    }

    // overRow < 5 && setRows(5);
    // overRow >= 5 && overRow <= 20 && setRows(overRow + 1);

    // overColumn === columns && overColumn < 20 && setColumns(columns + 1);
    // overColumn + 1 < columns && overColumn > 3 && setColumns(columns - 1);
  };

  return (
    <Wrapper
      className={className}
      onMouseMove={onMouseMove}
      columns={columns}
      rows={rows}
    >
      {range(rows).map(rowIndex =>
        range(columns).map(columnIndex => {
          // console.log(rowIndex, columnIndex);
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

      {/* <span>
        {activeColumns} x {activeRows}
      </span> */}
    </Wrapper>
  );
};

Grid.propTypes = {};

Grid.defaultProps = {};

export default Grid;
