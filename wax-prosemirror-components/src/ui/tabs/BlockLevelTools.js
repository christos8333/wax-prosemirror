import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import BlockElementGroup from './BlockElementGroup';

const Wrapper = styled.div`
  > div:not(:last-child) {
    margin-bottom: 8px;
  }
`;

const BlockLevelTools = props => {
  const { groups } = props;

  return (
    <Wrapper>
      {groups &&
        groups.map(group => (
          <BlockElementGroup groupName={group.groupName} items={group.items} />
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
          content: PropTypes.string,
        }),
      ),
    }),
  ).isRequired,
};

export default BlockLevelTools;
