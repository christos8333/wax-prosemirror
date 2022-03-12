import React, { useContext, useMemo, useState, useRef } from 'react';
import styled from 'styled-components';
import { grid } from '@pubsweet/ui-toolkit';
import { WaxContext } from 'wax-prosemirror-core';
import MenuButton from '../../ui/buttons/MenuButton';
import SpecialCharactersComponent from './SpecialCharactersComponent';
import useOnClickOutside from '../../helpers/useOnClickOutside';

const Wrapper = styled.div`
  font-size: 0;
  position: relative;
  z-index: 2;
`;

const DropWrapper = styled.div`
  background: white;
  margin-top: ${grid(1)};
  position: absolute;
  top: 32px;
`;

const SpecialCharactersTool = ({ view = {}, item }) => {
  const {
    pmViews: { main },
  } = useContext(WaxContext);

  const { icon, title } = item;
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  useOnClickOutside(ref, () => setIsOpen(false));

  let isDisabled = false;
  const isEditable = main.props.editable(editable => {
    return editable;
  });
  if (!isEditable) isDisabled = true;

  const MemorizedDropdown = useMemo(
    () => (
      <Wrapper ref={ref}>
        <MenuButton
          active={isOpen}
          disabled={isDisabled}
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
    [isOpen, isDisabled],
  );

  return MemorizedDropdown;
};

export default SpecialCharactersTool;
