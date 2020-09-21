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

const Label = styled(Button)``;

const BlockElement = props => {
  const { item, onClick } = props;

  return (
    <Wrapper onClick={onClick}>
      <Box />
      <Label item={item} />
    </Wrapper>
  );
};

BlockElement.propTypes = {
  item: PropTypes.shape({
    content: PropTypes.string,
  }).isRequired,
};

export default BlockElement;
