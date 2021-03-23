import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { th } from '@pubsweet/ui-toolkit';

const CheckBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const CheckBoxLabel = styled.label`
  clear: both;
  cursor: pointer;
  display: block;
  font-size: 18px;
  height: 20px;
  line-height: 20px;
  margin-right: 10px;
  position: relative;
  width: 20px;

  input {
    cursor: pointer;
    opacity: 0;
    position: absolute;
  }

  input:checked ~ span {
    background-color: #ffffff;
    border: 2px solid #4b5871;
    border-radius: 5px;
    opacity: 1;
    -webkit-transform: rotate(0deg) scale(1);
    -ms-transform: rotate(0deg) scale(1);
    transform: rotate(0deg) scale(1);
  }

  input:checked ~ span::after {
    background-color: transparent;
    border: solid ${th('colorBackgroundButton')};
    border-radius: 0;
    border-width: 0 2px 2px 0;
    height: 12px;
    left: 4px;
    opacity: 1;
    top: -1px;
    -webkit-transform: rotate(45deg) scale(1);
    -ms-transform: rotate(45deg) scale(1);
    transform: rotate(45deg) scale(1);
    width: 6px;
  }
`;
const CheckboxCustom = styled.span`
  background-color: transparent;
  border: 2px solid #4b5871;
  border-radius: 5px;
  height: 20px;
  left: 0px;
  position: absolute;
  top: 0px;
  transition: all 0.3s ease-out;
  width: 20px;
  -webkit-transition: all 0.3s ease-out;
  -moz-transition: all 0.3s ease-out;
  -ms-transition: all 0.3s ease-out;
  -o-transition: all 0.3s ease-out;

  &:after {
    border: solid ${th('colorBackgroundButton')};
    border-radius: 5px;
    border-width: 0 3px 3px 0;
    content: '';
    height: 0px;
    left: 12px;
    opacity: 1;
    position: absolute;
    top: 12px;
    width: 0px;
    -webkit-transform: rotate(0deg) scale(0);
    -ms-transform: rotate(0deg) scale(0);
    transform: rotate(0deg) scale(0);
    transition: all 0.3s ease-out;
    -webkit-transition: all 0.3s ease-out;
    -moz-transition: all 0.3s ease-out;
    -ms-transition: all 0.3s ease-out;
    -o-transition: all 0.3s ease-out;
  }
`;
const CheckboxTitle = styled.div`
  color: #4b5871;
  font-size: 15px;
  margin-left: 30px;
  position: relative;
  top: 2px;
  width: 200px;
`;

const CheckBox = props => {
  const { checked, name, label, onChange } = props;
  return (
    <CheckBoxContainer>
      <CheckBoxLabel>
        <input
          defaultChecked={checked}
          id={name}
          name={name}
          onChange={onChange}
          type="checkbox"
        />
        <CheckboxCustom />
        <CheckboxTitle>{label}</CheckboxTitle>
      </CheckBoxLabel>
    </CheckBoxContainer>
  );
};

CheckBox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

CheckBox.defaultProps = {
  checked: false,
  label: null,
};

export default CheckBox;
