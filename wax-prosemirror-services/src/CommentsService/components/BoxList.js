/* eslint react/prop-types: 0 */
import { Mark } from 'prosemirror-model';
import React from 'react';
import ConnectedComment from './ConnectedComment';
import ConnectedTrackChange from './ConnectedTrackChange';

export default ({ commentsTracks, view, position, recalculateTops }) => {
  if (!position) return null;
  return (
    <>
      {commentsTracks.map((commentTrack, index) => {
        const id =
          commentTrack instanceof Mark
            ? commentTrack.attrs.id
            : commentTrack.node.attrs.id;

        const top = position[index] ? position[index][id] : 0;

        if (commentTrack.type && commentTrack.type.name === 'comment') {
          return (
            <ConnectedComment
              comment={commentTrack}
              commentId={id}
              key={id}
              recalculateTops={recalculateTops}
              top={top}
            />
          );
        }
        return (
          <ConnectedTrackChange
            key={id}
            recalculateTops={recalculateTops}
            top={top}
            trackChange={commentTrack}
            trackChangeId={id}
            view={view}
          />
        );
      })}
    </>
  );
};
