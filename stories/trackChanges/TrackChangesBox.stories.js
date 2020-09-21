import React, { useState } from 'react';
import { lorem, name } from 'faker';

import TrackChangesBox from '../../wax-prosemirror-components/src/ui/trackChanges/TrackChangesBox';
import { Demo } from '../_helpers';

export const Base = () => {
  const [active, setActive] = useState(false);
  const makeActive = () => setActive(!active);

  return (
    <Demo onClickButton={() => setActive(false)}>
      <TrackChangesBox
        active={active}
        displayName={name.findName()}
        label="add"
        onClick={makeActive}
        onClickAccept={() => console.log('accept!')}
        onClickReject={() => console.log('reject!')}
        text={lorem.words(7)}
        timestamp="2 days ago"
      />
    </Demo>
  );
};

export const NotActive = () => (
  <TrackChangesBox label="add" text={lorem.words(7)} />
);

export const Active = () => (
  <TrackChangesBox
    active
    displayName={name.findName()}
    label="add"
    onClickAccept={() => console.log('accept!')}
    onClickReject={() => console.log('reject!')}
    text={lorem.words(7)}
    timestamp="2 days ago"
  />
);

export default {
  component: TrackChangesBox,
  title: 'Track Changes/Track Changes Box',
};
