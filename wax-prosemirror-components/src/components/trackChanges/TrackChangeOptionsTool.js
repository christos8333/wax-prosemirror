import React, { useMemo, useState, useRef, useEffect } from 'react';

import styled from 'styled-components';
import { grid } from '@pubsweet/ui-toolkit';

import MenuButton from '../../ui/buttons/MenuButton';
import TrackChangeOptionsComponent from './TrackChangeOptionsComponent';

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
  const [isOpen, setIsOpen] = useState(false);
  const [showHide, setShowHide] = useState(true);

  const ref = useRef();

  const setShowHidden = value => {
    setShowHide(value);
  };

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
        />

        {isOpen && (
          <DropWrapper>
            <TrackChangeOptionsComponent
              close={() => {
                setIsOpen(false);
              }}
              groups={groups}
              setShowHidden={setShowHidden}
              showHiddenValue={showHide}
            />
          </DropWrapper>
        )}
      </Wrapper>
    ),
    [isOpen, showHide],
  );

  return MemorizedDropdown;
};

export default TrackChangeOptionsTool;
