import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { grid, th, override } from '@pubsweet/ui-toolkit';
import { DateParser } from 'wax-prosemirror-core';

const Wrapper = styled.div``;

const Head = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  margin-bottom: ${grid(2)};

  ${override('Wax.CommentInfoWrapper')}
`;

const Name = styled.div`
  font-size: ${th('fontSizeBase')};

  ${override('Wax.CommentName')}
`;

const Timestamp = styled.div`
  color: gray;
  font-size: ${th('fontSizeBaseSmall')};

  ${override('Wax.CommentTimestamp')}
`;

const Content = styled.div`
  font-family: ${th('fontReading')};
  font-size: ${th('fontSizeBaseLarge')};

  ${override('Wax.CommentContent')}
`;

const CommentItem = props => {
  const { className, content, displayName, timestamp, active } = props;
  return (
    <Wrapper active={active} className={className}>
      <Head active={active}>
        <Name>{displayName}</Name>
        <Timestamp>
          <DateParser timestamp={timestamp}>
            {(timeStamp, timeAgo) => {
              return `${timeAgo} ago`;
            }}
          </DateParser>
        </Timestamp>
      </Head>
      <Content active={active}>{content}</Content>
    </Wrapper>
  );
};

CommentItem.propTypes = {
  active: PropTypes.bool,
  /** Actual comment text */
  content: PropTypes.string.isRequired,
  /** Display name of user that made the comment */
  displayName: PropTypes.string.isRequired,
  /** When the comment was made */
  timestamp: PropTypes.number.isRequired,
};

CommentItem.defaultProps = {
  active: false,
};

export default CommentItem;
