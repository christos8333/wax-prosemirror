import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { grid, th } from '@pubsweet/ui-toolkit';
import { DateParser } from 'wax-prosemirror-core';

const Wrapper = styled.div``;

const Head = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  margin-bottom: ${grid(2)};
`;

const Name = styled.div`
  font-size: ${th('fontSizeBaseSmall')};
`;

const Timestamp = styled.div`
  color: gray;
  font-size: 14px;
`;

const Content = styled.div`
  font-family: ${th('fontReading')};
  font-size: 16px;
`;

const CommentItem = props => {
  const { className, content, displayName, timestamp } = props;

  return (
    <Wrapper className={className}>
      <Head>
        <Name>{displayName}</Name>
        <Timestamp>
          <DateParser timestamp={timestamp}>
            {(timeStamp, timeAgo) => {
              return `${timeAgo} ago`;
            }}
          </DateParser>
        </Timestamp>
      </Head>
      <Content>{content}</Content>
    </Wrapper>
  );
};

CommentItem.propTypes = {
  /** Actual comment text */
  content: PropTypes.string.isRequired,
  /** Display name of user that made the comment */
  displayName: PropTypes.string.isRequired,
  /** When the comment was made */
  timestamp: PropTypes.number.isRequired,
};

CommentItem.defaultProps = {};

export default CommentItem;
