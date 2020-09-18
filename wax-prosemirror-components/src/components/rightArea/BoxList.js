/* eslint react/prop-types: 0 */
import { Mark } from 'prosemirror-model';
import React from 'react';
import ConnectedComment from '../comments/ConnectedComment';
import TrackChangeBox from '../trackChanges/TrackChangeBox';

export default ({ commentsTracks, view, position }) => {
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
              key={id}
              comment={commentTrack}
              top={top}
              commentId={id}
            />
          );
        }
        return (
          <TrackChangeBox
            key={id}
            trackChange={commentTrack}
            view={view}
            top={top}
            dataBox={id}
          />
        );
      })}
    </>
  );
};
