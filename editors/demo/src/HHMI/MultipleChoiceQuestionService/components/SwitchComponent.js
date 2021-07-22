import React, { useState } from 'react';
import styled from 'styled-components';
import Switch from './Switch';

const StyledSwitch = styled(Switch)`
  display: flex;
  margin-left: auto;

  span:nth-child(1) {
    bottom: 36px;
    left: 4px;
    position: relative;
    width: 0px;
  }

  .ant-switch-checked {
    background-color: green;
  }
`;

const CustomSwitch = () => {
  const [checked, setChecked] = useState(false);
  const handleChange = () => setChecked(!checked);
  return (
    <StyledSwitch
      checked={checked}
      checkedChildren="YES"
      label="Correct?"
      labelPosition="left"
      onChange={handleChange}
      unCheckedChildren="NO"
    />
  );
};

export default CustomSwitch;
