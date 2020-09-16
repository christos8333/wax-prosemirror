/* eslint react/prop-types: 0 */
import { Mark } from 'prosemirror-model';
import React, { useState, useEffect, useContext } from 'react';
import { Transition } from 'react-transition-group';
import styled from 'styled-components';
import { WaxContext } from 'wax-prosemirror-core';

const TrackChangeBoxStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  border: 1px solid blue;
  position: relative;
  transition: ${({ state }) => 'top 1s, opacity 1.5s, left 1s'};
  top: ${props => (props.top ? `${props.top}px` : 0)};
  left: ${props => (props.active ? `${-2}%` : `0%`)};
  opacity: ${({ state }) => {
    switch (state) {
      case 'exited':
        return 0.2;
      case 'exiting':
        return 0.4;
      case 'entering':
        return 0.6;
      case 'entered':
        return 1;
      default:
    }
  }};
`;

export default ({ trackChange, view, top, dataBox }) => {
  const [animate, setAnimate] = useState(false);
  const {
    view: { main },
    app,
    activeView,
  } = useContext(WaxContext);
  let action;
  if (trackChange instanceof Mark) {
    if ((trackChange.type.name = 'format_change')) {
      const {
        attrs: { username, before, after },
      } = trackChange;
      action = `User ${username} added ${after[0]}`;
    }
  } else {
    action = `User demo changed paragraph to heading 1`;
  }

  let active = false;
  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <>
      <Transition in={animate} timeout={1000}>
        {state => (
          <TrackChangeBoxStyled
            top={top}
            state={state}
            data-box={dataBox}
            active={active}
          >
            <div>
              {action}
              <button>Accept</button>
              <button>Reject</button>
            </div>
          </TrackChangeBoxStyled>
        )}
      </Transition>
    </>
  );
};
