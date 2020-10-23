import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '../../components/Button';

const Wrapper = styled.div`
  display: flex;
  button {
    border-radius: 4px;
    margin-left: 4px;
    padding-left: 25px;
    position: relative;
    left: -33px;
  }
`;

const Box = styled.div`
  width: 22px;
  height: 22px;
  position: relative;
  top: 3px;
  right: 3px;
  border-radius: 4px;
  background: #bfc4cd;
  z-index: 999;
`;

const StyledButton = styled(Button)``;

const BlockElement = props => {
  const { item, onClick, view } = props;

  return (
    <Wrapper onClick={onClick}>
      <Box />
      <StyledButton item={item} view={view} />
    </Wrapper>
  );
};

BlockElement.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.string,
  }).isRequired,
};

export default BlockElement;
