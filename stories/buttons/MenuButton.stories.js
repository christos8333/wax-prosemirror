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
        iconName="boldSvg"
        onClick={() => setActive(!active)}
      />
    </Demo>
  );
};

export const Inactive = () => <MenuButton iconName="boldSvg" />;
export const Active = () => <MenuButton active iconName="boldSvg" />;
export const Disabled = () => <MenuButton disabled iconName="boldSvg" />;

export const IconAndText = () => {
  const [active, setActive] = useState(false);

  const reset = () => {
    setActive(false);
  };

  return (
    <Demo onClickButton={reset}>
      <MenuButton
        active={active}
        iconName="boldSvg"
        label="Make it bold"
        onClick={() => setActive(!active)}
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
        onClick={() => setActive(!active)}
      />
    </Demo>
  );
};

export default {
  component: MenuButton,
  title: 'Buttons/Menu Button',
};
