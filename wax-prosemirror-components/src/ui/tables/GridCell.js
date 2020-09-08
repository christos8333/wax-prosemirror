import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 12px;
  width: 12px;
  border: 1px solid gray;
  transition: background 0.1s ease-in;

  ${props => props.active && `background: skyblue;`}
`;

// const GridCell = props => {
//   const { active, className, onMouseEnter } = props;

//   return (
//     <Wrapper
//       active={active}
//       className={className}
//       onMouseEnter={onMouseEnter}
//     />
//   );
// };

class GridCell extends React.PureComponent {
  render() {
    const { active, className, onMouseEnter } = this.props;

    return (
      <Wrapper
        active={active}
        className={className}
        onMouseEnter={onMouseEnter}
      />
    );
  }
}

GridCell.propTypes = {};

GridCell.defaultProps = {};

export default GridCell;
