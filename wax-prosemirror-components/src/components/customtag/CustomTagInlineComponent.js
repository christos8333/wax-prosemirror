import React, { useContext, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import MenuButton from '../../ui/buttons/MenuButton';

const Wrapper = styled.div`
  font-size: 0;
  position: relative;
  z-index: 2;
`;


const CustomTagInlineComponent = ({ view: { state }, item }) => {
  const { icon, title } = item;
  const localInline = JSON.parse(localStorage.getItem('isInline'))
  const [isOpen, setIsOpen] = useState((localInline !== null && localInline !== false) ? true : false);
  const ref = useRef();
  
  const onClickIcon = () => {
    setIsOpen(isOpen === true ? false : true);
    localStorage.setItem('isInline', isOpen === true ? false : true);
  }

  return useMemo(
    () => (
      <Wrapper ref={ref}>
        <div onClick={onClickIcon}>
          <MenuButton
            active={isOpen}
            iconName={icon}
            disabled={false}
            title={title}
          />
        </div>
      </Wrapper>
    ),
    [isOpen],
  );
};

export default CustomTagInlineComponent;
