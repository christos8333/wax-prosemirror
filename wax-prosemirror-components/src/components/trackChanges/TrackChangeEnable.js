/* eslint react/prop-types: 0 */
import React, { useState } from 'react';
import MenuButton from '../../ui/buttons/MenuButton';

const TrackChangeEnable = ({ view = {}, item, enabled }) => {
  const [isEnabled, setEnabled] = useState(enabled);

  const handleMouseDown = e => {
    e.preventDefault();
    setEnabled(!isEnabled);
    item.run(view.state, view.dispatch);
  };

  return (
    <MenuButton
      active={isEnabled}
      disabled={item.enable && !item.enable(view.state)}
      label="Track Changes"
      onMouseDown={e => handleMouseDown(e)}
      title={item.title}
    />
  );
};

export default TrackChangeEnable;
