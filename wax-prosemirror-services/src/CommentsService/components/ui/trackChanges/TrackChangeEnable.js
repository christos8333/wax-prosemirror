/* eslint react/prop-types: 0 */
import React, { useState, useMemo } from 'react';
import { MenuButton } from 'wax-prosemirror-components';

const TrackChangeEnable = ({ view = {}, item, enabled }) => {
  const [isEnabled, setEnabled] = useState(enabled);

  const handleMouseDown = e => {
    e.preventDefault();
    setEnabled(!isEnabled);
    item.run(view.state, view.dispatch);
  };

  const TrackChangeEnableComponent = useMemo(
    () => (
      <MenuButton
        active={isEnabled}
        disabled={item.enable && !item.enable(view.state)}
        label="Track Changes"
        onMouseDown={e => handleMouseDown(e)}
        title={item.title}
      />
    ),
    [isEnabled],
  );

  return TrackChangeEnableComponent;
};

export default TrackChangeEnable;
