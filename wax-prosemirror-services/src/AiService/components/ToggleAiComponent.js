import React, { useMemo, useState, useContext } from 'react';
import styled from 'styled-components';
import { WaxContext } from 'wax-prosemirror-core';
import Switch from './Switch';

const StyledSwitch = styled(Switch)`
  display: flex;
  margin-left: auto;
`;

const ToggleAiComponent = () => {
  const [checked, setChecked] = useState(false);
  const context = useContext(WaxContext);
  const {
    pmViews: { main },
  } = context;

  let isDisabled = false;
  const isEditable = main.props.editable(editable => {
    return editable;
  });

  if (!isEditable) isDisabled = true;

  const handleChange = () => {
    setChecked(!checked);
    context.setOption({ AiOn: !checked });
  };

  return useMemo(
    () => (
      <StyledSwitch
        checked={checked}
        checkedChildren="AI ON"
        disabled={!isEditable}
        onChange={handleChange}
        unCheckedChildren="AI OFF"
      />
    ),
    [checked, isDisabled],
  );
};

export default ToggleAiComponent;
