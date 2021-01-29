import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;

  button {
    border-radius: 4px;
    left: -33px;
    margin-left: 4px;
    padding-left: 25px;
    position: relative;
  }
`;

const Box = styled.div`
  background: #bfc4cd;
  border-radius: 4px;
  height: 22px;
  position: relative;
  right: 3px;
  top: 3px;
  width: 22px;
  z-index: 999;
`;

const BlockElement = props => {
  const { item, onClick, view } = props;
  return (
    <Wrapper onClick={onClick}>
      <Box />
      {item.renderTool(view)}
    </Wrapper>
  );
};

BlockElement.propTypes = {
  view: PropTypes.shape({
    dispatch: PropTypes.func,
  }).isRequired,
  item: PropTypes.shape({
    label: PropTypes.string,
    renderTool: PropTypes.func,
  }).isRequired,
};

export default BlockElement;
