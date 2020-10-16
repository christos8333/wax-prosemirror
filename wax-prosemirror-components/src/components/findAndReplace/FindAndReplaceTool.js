import React, { useRef, useMemo, useContext, useState } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import styled from 'styled-components';
import { grid } from '@pubsweet/ui-toolkit';
import VisibilitySensor from 'react-visibility-sensor';

import MenuButton from '../../ui/buttons/MenuButton';
import FindAndReplaceComponent from './FindAndReplaceComponent';
import useOnClickOutside from '../../helpers/useOnClickOutside';

const FindAndReplaceTool = ({ view = {}, item }) => {
  const {
    view: { main },
    activeViewId,
  } = useContext(WaxContext);
  if (item.onlyOnMain) {
    view = main;
  }

  const Wrapper = styled.div`
    font-size: 0;
    position: relative;
    z-index: 2;
  `;

  const DropWrapper = styled.div`
    margin-top: ${grid(1)};
    position: absolute;
    background: white;
    top: 30px;
  `;

  const { state } = view;
  const { enable, icon, run, select, title } = item;
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const dropComponent = <FindAndReplaceComponent />;

  // const isDisabled =
  //   enable && !enable(state) && !(select && select(state, activeViewId));
  //
  useOnClickOutside(ref, () => setIsOpen(false));

  const styles = { right: '-205px' };
  const [style, setStyle] = useState(styles);
  console.log('here?');
  const onChange = isVisible => {
    if (!isVisible) setStyle({ right: '0' });
  };

  const MemorizedDropdown = useMemo(
    () => (
      <Wrapper ref={ref}>
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
          <VisibilitySensor onChange={onChange}>
            <DropWrapper style={style}>{dropComponent}</DropWrapper>
          </VisibilitySensor>
        )}
      </Wrapper>
    ),
    [isOpen, style],
  );

  return MemorizedDropdown;
};

export default FindAndReplaceTool;
