import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import BlockElementGroup from './BlockElementGroup';

const Wrapper = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: 8px 8px 16px 8px;
  > div:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const BlockLevelTools = props => {
  const { groups, view } = props;

  return (
    <Wrapper>
      {groups &&
        groups.map(group => (
          <BlockElementGroup
            groupName={group.groupName}
            items={group.items}
            key={group.groupName}
            view={view}
          />
        ))}
    </Wrapper>
  );
};

BlockLevelTools.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      groupName: PropTypes.string,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
        }),
      ),
    }),
  ).isRequired,
};

export default BlockLevelTools;
