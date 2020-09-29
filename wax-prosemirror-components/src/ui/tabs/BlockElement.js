import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../../components/Button';

const Wrapper = styled.div`
  display: flex;
`;

const Box = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 4px;
  background: gray;
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
