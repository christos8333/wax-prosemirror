import React, { useState } from 'react';

import MenuButton from '../../wax-prosemirror-components/src/ui/buttons/MenuButton';

import { Demo } from '../_helpers';

export const Base = () => {
  const [active, setActive] = useState(false);

  const reset = () => {
    setActive(false);
  };

  return (
    <Demo onClickButton={reset}>
      <MenuButton
        active={active}
        iconName="bold"
        onMouseDown={() => setActive(!active)}
        title="bold"
      />
    </Demo>
  );
};

export const Inactive = () => <MenuButton iconName="bold" />;
export const Active = () => <MenuButton active iconName="bold" />;
export const Disabled = () => <MenuButton disabled iconName="bold" />;

export const IconAndText = () => {
  const [active, setActive] = useState(false);

  const reset = () => {
    setActive(false);
  };

  return (
    <Demo onClickButton={reset}>
      <MenuButton
        active={active}
        iconName="bold"
        label="Make it bold"
        onMouseDown={() => setActive(!active)}
      />
    </Demo>
  );
};

export const TextOnly = () => {
  const [active, setActive] = useState(false);

  const reset = () => {
    setActive(false);
  };

  return (
    <Demo onClickButton={reset}>
      <MenuButton
        active={active}
        label="Make it bold"
        onMouseDown={() => setActive(!active)}
      />
    </Demo>
  );
};

export default {
  component: MenuButton,
  title: 'Buttons/Menu Button',
};
