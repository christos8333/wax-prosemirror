import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { ButtonStyles } from 'wax-prosemirror-themes';
import { WaxContext } from 'wax-prosemirror-core';

const ButtonStyled = styled.button`
  ${ButtonStyles};
  opacity: ${props => (props.select ? 1 : 0.4)};
  pointer-events: ${props => (props.select ? 'default' : 'none')};
  color: ${props => (props.isActive ? 'white' : props.theme.colorButton)};
  background-color: ${props =>
    props.isActive ? props.theme.colorPrimary : 'transparent'};
  &:hover {
    background-color: ${props =>
      props.isActive ? props.theme.colorPrimary : 'transparent'};
  }
`;

const TrackChangeEnable = ({ view = {}, item, enabled }) => {
  if (item.onlyOnMain) {
    const {
      view: { main },
    } = useContext(WaxContext);
    view = main;
  }

  const [isEnabled, setEnabled] = useState(enabled);

  return (
    <ButtonStyled
      type="button"
      isActive={isEnabled}
      title={item.title}
      disabled={item.enable && !item.enable(view.state)}
      onMouseDown={e => {
        e.preventDefault();
        setEnabled(!isEnabled);
        item.run(view.state, view.dispatch);
      }}
      select={item.select && item.select(view.state)}
    >
      {item.content}
    </ButtonStyled>
  );
};

export default TrackChangeEnable;
