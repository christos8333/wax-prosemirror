/* eslint react/prop-types: 0 */
import React, { useContext, useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import { DocumentHelpers } from 'wax-prosemirror-utilities';
import { WaxContext } from 'wax-prosemirror-core';
import { last, maxBy } from 'lodash';
import { TextSelection } from 'prosemirror-state';
import TrackChangesBox from './TrackChangesBox';

const ConnectedTrackChangeStyled = styled.div`
  margin-left: ${props => (props.active ? `${-20}px` : `${50}px`)};
  position: absolute;
  width: 200px;
  @media (max-width: 600px) {
    margin-left: 15px;
  }
`;

export default ({ trackChangeId, top, recalculateTops, trackChange }) => {
  const { app, activeView, view } = useContext(WaxContext);

  const [isActive, setIsActive] = useState(false);
  // const { state, dispatch } = activeView;
  const viewId = trackChange.attrs
    ? trackChange.attrs.viewid
    : trackChange.node.attrs.viewid;
  const styles = {
    top: `${top}px`,
  };

  const trakChangePlugin = app.PmPlugins.get('trackChangePlugin');
  const activeTrackChange = trakChangePlugin.getState(activeView.state)
    .trackChange;
  console.log(activeTrackChange);
  const onClickBox = trackData => {
    if (trackData.node) return focusOnBlcock(trackData);

    const allTracksWithSameId = DocumentHelpers.findAllMarksWithSameId(
      view[viewId].state,
      trackData,
    );
    const maxPos = maxBy(allTracksWithSameId, 'pos');
    maxPos.pos += last(allTracksWithSameId).node.nodeSize;

    view[viewId].dispatch(
      view[viewId].state.tr.setSelection(
        new TextSelection(view[viewId].state.tr.doc.resolve(maxPos.pos - 1)),
      ),
    );

    view[viewId].focus();
    return true;
  };

  const focusOnBlcock = trackData => {
    view[viewId].dispatch(
      view[viewId].state.tr.setSelection(
        new TextSelection(view[viewId].state.tr.doc.resolve(trackData.pos + 1)),
      ),
    );

    view[viewId].focus();
    return true;
  };

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
          onClickBox={onClickBox}
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
