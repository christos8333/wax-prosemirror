import React, { useMemo, useState, useRef } from 'react';

import styled from 'styled-components';
import { grid } from '@pubsweet/ui-toolkit';

import MenuButton from '../../ui/buttons/MenuButton';
import TrackChangeOptionsComponent from './TrackChangeOptionsComponent';
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
  right: -3px;
  top: 32px;
`;

const TrackChangeOptionsTool = ({ view = {}, item, groups }) => {
  // const { icon, title } = item;

  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  // useOnClickOutside(ref, () => setIsOpen(false));

  const MemorizedDropdown = useMemo(
    () => (
      <Wrapper ref={ref}>
        <MenuButton
          active={isOpen}
          disabled={false}
          iconName="more"
          onMouseDown={() => {
            setIsOpen(!isOpen);
          }}
          // title={title}
        />

        {isOpen && (
          <DropWrapper>
            <TrackChangeOptionsComponent
              groups={groups}
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

export default TrackChangeOptionsTool;
