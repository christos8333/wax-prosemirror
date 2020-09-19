import React, { useState } from 'react';
import { random } from 'faker';

import LinkTooltip from '../../wax-prosemirror-components/src/ui/Link/LinkTooltip';

import { Demo, Note } from '../_helpers';

export const Base = () => {
  const [showRemove, setShowRemove] = useState(false);
  const [showApply, setShowApply] = useState(false);
  const [key, setKey] = useState(random.uuid());

  const handleApply = () => {
    setShowApply(true);
    setTimeout(() => setShowApply(false), 2000);
  };

  const handleRemove = () => {
    handleReset();

    setShowRemove(true);
    setTimeout(() => setShowRemove(false), 2000);
  };

  const handleReset = () => {
    // changing the key will destroy the component and make a new one
    setKey(random.uuid());
  };

  return (
    <Demo onClickButton={handleReset}>
      <Note>
        When removing, the whole annotation should go away and the component
        should be unmounted, so there is no need to reset the tooltip&apos;s
        internal state.
      </Note>

      <LinkTooltip
        onClickApply={handleApply}
        onClickRemove={handleRemove}
        key={key}
        value={null}
      />

      {showApply && <div>Apply it!</div>}
      {showRemove && <div>Remove it!</div>}
    </Demo>
  );
};

export const NewLink = () => <LinkTooltip />;

export const ExistingLink = () => (
  <LinkTooltip value="https://coko.foundation/" />
);

export default {
  component: LinkTooltip,
  title: 'Link/Link Tooltip',
};
