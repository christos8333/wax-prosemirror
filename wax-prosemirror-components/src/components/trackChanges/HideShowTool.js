/* eslint react/prop-types: 0 */
import React, { useState, useMemo } from 'react';
import MenuButton from '../../ui/buttons/MenuButton';

const HideShowTool = ({ view = {}, item, enabled }) => {
  const [isEnabled, setEnabled] = useState(enabled);

  const handleMouseDown = e => {
    e.preventDefault();
    setEnabled(!isEnabled);
    item.run(view.state, view.dispatch);
  };

  const HideShowToolComponent = useMemo(
    () => (
      <MenuButton
        active={isEnabled}
        disabled={item.enable && !item.enable(view.state)}
        label="Hide/Show"
        onMouseDown={e => handleMouseDown(e)}
        title={item.title}
      />
    ),
    [isEnabled],
  );

  return HideShowToolComponent;
};

export default HideShowTool;
