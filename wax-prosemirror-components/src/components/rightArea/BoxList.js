import { Mark } from 'prosemirror-model';
import React from 'react';
import CommentBox from '../comments/CommentBox';
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
            <CommentBox
              key={id}
              comment={commentTrack}
              top={top}
              dataBox={id}
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
