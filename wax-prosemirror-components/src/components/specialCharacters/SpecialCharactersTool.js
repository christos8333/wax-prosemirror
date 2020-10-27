import React, { useMemo, useState } from 'react';

import styled from 'styled-components';
import { grid } from '@pubsweet/ui-toolkit';

import MenuButton from '../../ui/buttons/MenuButton';
import SpecialCharactersComponent from './SpecialCharactersComponent';

const Wrapper = styled.div`
  font-size: 0;
  position: relative;
  z-index: 2;
`;

const DropWrapper = styled.div`
  margin-top: ${grid(1)};
  position: absolute;
  background: white;
  top: 32px;
`;

const SpecialCharactersTool = ({ view = {}, item }) => {
  const { icon, title } = item;
  const [isOpen, setIsOpen] = useState(false);

  const MemorizedDropdown = useMemo(
    () => (
      <Wrapper>
        <MenuButton
          active={isOpen}
          disabled={false}
          iconName={icon}
          onMouseDown={() => {
            setIsOpen(!isOpen);
          }}
          title={title}
        />

        {isOpen && (
          <DropWrapper>
            <SpecialCharactersComponent
              close={() => {
                setIsOpen(false);
              }}
            />
          </DropWrapper>
        )}
      </Wrapper>
    ),
    [isOpen],
  );

  return MemorizedDropdown;
};

export default SpecialCharactersTool;
