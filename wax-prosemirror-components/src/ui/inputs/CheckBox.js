import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { th, override } from '@pubsweet/ui-toolkit';

const CheckBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const CheckBoxLabel = styled.label`
  display: block;
  position: relative;
  margin-right: 10px;
  cursor: pointer;
  font-size: 18px;
  line-height: 20px;
  height: 20px;
  width: 20px;
  clear: both;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  input:checked ~ span {
    background-color: #ffffff;
    border-radius: 5px;
    -webkit-transform: rotate(0deg) scale(1);
    -ms-transform: rotate(0deg) scale(1);
    transform: rotate(0deg) scale(1);
    opacity: 1;
    border: 2px solid #4b5871;
  }

  input:checked ~ span::after {
    -webkit-transform: rotate(45deg) scale(1);
    -ms-transform: rotate(45deg) scale(1);
    transform: rotate(45deg) scale(1);
    opacity: 1;
    left: 6px;
    top: 1px;
    width: 6px;
    height: 12px;
    border: solid #009bff;
    border-width: 0 2px 2px 0;
    background-color: transparent;
    border-radius: 0;
  }
`;
const CheckboxCustom = styled.span`
  position: absolute;
  top: 0px;
  left: 0px;
  height: 20px;
  width: 20px;
  background-color: transparent;
  border-radius: 5px;
  transition: all 0.3s ease-out;
  -webkit-transition: all 0.3s ease-out;
  -moz-transition: all 0.3s ease-out;
  -ms-transition: all 0.3s ease-out;
  -o-transition: all 0.3s ease-out;
  border: 2px solid #4b5871;

  &:after {
    position: absolute;
    content: '';
    left: 12px;
    top: 12px;
    height: 0px;
    width: 0px;
    border-radius: 5px;
    border: solid #009bff;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(0deg) scale(0);
    -ms-transform: rotate(0deg) scale(0);
    transform: rotate(0deg) scale(0);
    opacity: 1;
    transition: all 0.3s ease-out;
    -webkit-transition: all 0.3s ease-out;
    -moz-transition: all 0.3s ease-out;
    -ms-transition: all 0.3s ease-out;
    -o-transition: all 0.3s ease-out;
  }
`;
const CheckboxTitle = styled.div`
  color: #4b5871;
  position: relative;
  top: 2px;
  font-size: 15px;
  margin-left: 30px;
  width: 200px;
`;

const CheckBox = props => {
  const { name } = props;
  return (
    <CheckBoxContainer>
      <CheckBoxLabel>
        <input type="checkbox" id={name} name={name} />
        <CheckboxCustom />
        <CheckboxTitle>Case Sensitive</CheckboxTitle>
      </CheckBoxLabel>
    </CheckBoxContainer>
  );
};

CheckBox.propTypes = {
  name: PropTypes.string.isRequired,
  // active: PropTypes.bool.isRequired,
  // disabled: PropTypes.bool.isRequired,
  // iconName: PropTypes.string,
  // label: PropTypes.string,
  // title: PropTypes.string,
};

CheckBox.defaultProps = {
  // iconName: null,
  // label: null,
  // title: null,
};

export default CheckBox;
