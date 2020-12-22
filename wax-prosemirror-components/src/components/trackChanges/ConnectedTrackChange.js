/* eslint react/prop-types: 0 */
import React, { useContext, useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
// import { DocumentHelpers } from 'wax-prosemirror-utilities';
import { WaxContext } from 'wax-prosemirror-core';
import TrackChangesBox from './TrackChangesBox';

const ConnectedTrackChangeStyled = styled.div`
  margin-left: ${props => (props.active ? `${-20}px` : `${50}px`)};
  position: absolute;
  @media (max-width: 600px) {
    margin-left: 15px;
  }
`;

export default ({ trackChangeId, top, recalculateTops, trackChange }) => {
  const { app, activeView } = useContext(WaxContext);

  const [isActive, setIsActive] = useState(false);
  // const { state, dispatch } = activeView;

  const styles = {
    top: `${top}px`,
  };

  const trakChangePlugin = app.PmPlugins.get('trackChngePlugin');
  const activeTrackChange = trakChangePlugin.getState(activeView.state)
    .trackChange;

  useEffect(() => {
    setIsActive(false);
    if (activeTrackChange && trackChangeId === activeTrackChange.attrs.id) {
      setIsActive(true);
      recalculateTops();
    }
  }, [activeTrackChange]);

  const MemorizedTrackChange = useMemo(
    () => (
      <ConnectedTrackChangeStyled
        active={isActive}
        data-box={trackChangeId}
        style={styles}
      >
        <TrackChangesBox
          active={isActive}
          key={trackChangeId}
          recalculateTops={recalculateTops}
          trackChangeId={trackChangeId}
          trackData={trackChange}
        />
      </ConnectedTrackChangeStyled>
    ),
    [isActive, top],
  );
  return <>{MemorizedTrackChange}</>;
};
