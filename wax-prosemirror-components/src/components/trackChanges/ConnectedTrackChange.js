/* eslint react/prop-types: 0 */
import React, { useContext, useMemo } from 'react';
import styled from 'styled-components';
import { DocumentHelpers } from 'wax-prosemirror-utilities';
import { WaxContext } from 'wax-prosemirror-core';
import TrackChangesBox from '../../ui/trackChanges/TrackChangesBox';

const ConnectedTrackChangeStyled = styled.div`
  position: absolute;
  margin-left: ${props => (props.active ? `${-20}px` : `${50}px`)};
  width: 200px;
  @media (max-width: 600px) {
    margin-left: 15px;
  }
`;

export default ({ trackChangeId, top, recalculateTops }) => {
  const {
    view,
    view: {
      main: {
        props: { user },
      },
    },
    app,
    activeView,
  } = useContext(WaxContext);

  const { state, dispatch } = activeView;

  const styles = {
    top: `${top}px`,
  };

  const active = false;
  const MemorizedTrackChange = useMemo(
    () => (
      <ConnectedTrackChangeStyled
        data-box={trackChangeId}
        style={styles}
        active={active}
      >
        <TrackChangesBox
          key={trackChangeId}
          active={active}
          trackChangeId={trackChangeId}
          commentData=""
          recalculateTops={recalculateTops}
        />
      </ConnectedTrackChangeStyled>
    ),
    [active, top],
  );
  return <>{MemorizedTrackChange}</>;
};
