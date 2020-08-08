import { v4 as uuidv4 } from 'uuid';

const markWrapping = (tr, pos, oldNode, newNode, user, date, group) => {
  let track = oldNode.attrs.track.slice();
  let blockTrack = track.find(track => track.type === 'block_change');

  if (blockTrack) {
    track = track.filter(track => track !== blockTrack);
    if (
      blockTrack.before.type !== newNode.type.name ||
      blockTrack.before.attrs.level !== newNode.attrs.level
    ) {
      blockTrack = {
        type: 'block_change',
        user: user.userId,
        username: user.username,
        date,
        before: blockTrack.before,
      };
      track.push(blockTrack);
    }
  } else {
    blockTrack = {
      type: 'block_change',
      user: user.userId,
      username: user.username,
      date,
      before: { type: oldNode.type.name, attrs: oldNode.attrs },
    };
    if (blockTrack.before.attrs.id) {
      delete blockTrack.before.attrs.id;
    }
    if (blockTrack.before.attrs.track) {
      delete blockTrack.before.attrs.track;
    }
    track.push(blockTrack);
  }
  tr.setNodeMarkup(
    pos,
    null,
    Object.assign({}, newNode.attrs, { track, group, id: uuidv4() }),
  );
};

export default markWrapping;
