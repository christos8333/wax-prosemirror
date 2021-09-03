import React, { useState, useContext } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import styled from 'styled-components';
import Switch from './Switch';

const StyledSwitch = styled(Switch)`
  display: flex;
  margin-left: auto;

  span:nth-child(1) {
    bottom: 36px;
    display: flex;
    left: 4px;
    position: relative;
    width: 0px;
  }

  .ant-switch-checked {
    background-color: green;
  }
`;

const CustomSwitch = ({ node, getPos }) => {
  const context = useContext(WaxContext);
  const { activeViewId } = context;
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
    context.view.main.dispatch(
      context.view.main.state.tr.setNodeMarkup(getPos(), undefined, {
        ...node.attrs,
        correct: !checked,
      }),
    );
  };

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
