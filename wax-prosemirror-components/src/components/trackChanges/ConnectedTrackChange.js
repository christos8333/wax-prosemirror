/* eslint react/prop-types: 0 */
import React, { useContext, useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import { DocumentHelpers } from 'wax-prosemirror-utilities';
import { WaxContext } from 'wax-prosemirror-core';
import { last, maxBy } from 'lodash';
import { TextSelection } from 'prosemirror-state';
import TrackChangesBox from './TrackChangesBox';
import acceptTrackChange from './AcceptTrackChange';
import rejectTrackChange from './RejectTrackChange';

const ConnectedTrackChangeStyled = styled.div`
  margin-left: ${props => (props.active ? `${-20}px` : `${50}px`)};
  position: absolute;
  width: 200px;
  @media (max-width: 600px) {
    margin-left: 15px;
  }
`;

export default ({ trackChangeId, top, recalculateTops, trackChange }) => {
  const context = useContext(WaxContext);
  const { app, activeView, view } = context;
  const user = app.config.get('user');
  const [isActive, setIsActive] = useState(false);
  const { state, dispatch } = activeView;
  const viewId = trackChange.attrs
    ? trackChange.attrs.viewid
    : trackChange.node.attrs.viewid;
  const styles = {
    top: `${top}px`,
  };

  const trakChangePlugin = app.PmPlugins.get('trackChangePlugin');
  const activeTrackChange = trakChangePlugin.getState(activeView.state)
    .trackChange;

  const onClickBox = trackData => {
    if (trackData.node) return focusOnBlcock(trackData);

    if (viewId !== 'main') context.updateView({}, viewId);

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
    recalculateTops();
    if (activeTrackChange && trackChangeId === activeTrackChange.attrs.id) {
      setIsActive(true);
      recalculateTops();
    }
  }, [activeTrackChange]);

  const onClickAccept = () => {
    const acceptConfig = app.config.get('config.AcceptTrackChangeService');
    acceptTrackChange(state, dispatch, user, activeTrackChange, acceptConfig);
    view[viewId].focus();
  };

  const onClickReject = () => {
    const rejectConfig = app.config.get('config.RejectTrackChangeService');
    rejectTrackChange(state, dispatch, user, activeTrackChange, rejectConfig);
    view[viewId].focus();
  };

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
          onClickAccept={onClickAccept}
          onClickBox={onClickBox}
          onClickReject={onClickReject}
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
