import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: silver;
  display: inline-block;
  padding: 12px;

  a {
    color: unset;
    text-decoration: none;
  }
`;

const LinkWrapper = styled.div`
  display: inline-block;
  width: 250px;
  margin-right: 12px;
`;

const Input = styled.input`
  width: calc(100% - 8px);
`;

const ButtonGroup = styled.div`
  display: inline-block;
`;

const Link = props => {
  const { className, onClickApply, onClickRemove, value } = props;

  const [editable, setEditable] = useState(!value);
  const [inputValue, setInputValue] = useState(value || '');
  const [valueIfCancelled, setValueIfCancelled] = useState('');

  const handleChange = e => {
    setInputValue(e.target.value);
  };

  const handleApply = () => {
    if (inputValue) {
      onClickApply(inputValue);
      setEditable(false);
    }
  };

  const handleEdit = e => {
    setEditable(true);
    setValueIfCancelled(inputValue);
  };

  const handleCancel = () => {
    if (valueIfCancelled) {
      setInputValue(valueIfCancelled);
      setValueIfCancelled(null);
      setEditable(false);
    } else {
      handleRemove();
    }
  };

  const handleRemove = e => {
    onClickRemove();
  };

  const handleKeyUp = e => {
    if (e.keyCode === 13) handleApply(); // enter
    if (e.keyCode === 27) handleCancel(); // esc
  };

  return (
    <Wrapper className={className}>
      <LinkWrapper>
        {editable && (
          <Input
            onChange={handleChange}
            onKeyUp={handleKeyUp}
            value={inputValue}
          />
        )}

        {!editable && (
          <a href={value} rel="noreferrer" target="_blank">
            {inputValue}
          </a>
        )}
      </LinkWrapper>

      <ButtonGroup>
        {editable && (
          <>
            <button onClick={handleApply} type="button">
              Apply
            </button>

            <button onClick={handleCancel} type="button">
              Cancel
            </button>
          </>
        )}

        {!editable && (
          <>
            <button onClick={handleEdit} type="button">
              Edit
            </button>

            <button onClick={handleRemove} type="button">
              Remove
            </button>
          </>
        )}
      </ButtonGroup>
    </Wrapper>
  );
};

Link.propTypes = {
  onClickApply: PropTypes.func.isRequired,
  onClickRemove: PropTypes.func.isRequired,
  value: PropTypes.string,
};

Link.defaultProps = {
  value: null,
};

export default Link;
