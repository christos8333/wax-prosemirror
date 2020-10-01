import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import BlockElementGroup from './BlockElementGroup';

const Wrapper = styled.div`
  padding: 8px;

  > div:not(:last-child) {
    margin-bottom: 20px;
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
            key={group.groupName}
            items={group.items}
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
