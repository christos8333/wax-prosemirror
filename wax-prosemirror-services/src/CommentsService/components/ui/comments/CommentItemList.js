import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { clone, uniqueId } from 'lodash';
import { override, th } from '@pubsweet/ui-toolkit';
import { WaxContext } from 'wax-prosemirror-core';
import CommentItem from './CommentItem';

const Wrapper = styled.div`
  padding: 8px 16px;

  > div:not(:last-of-type) {
    margin-bottom: 16px;
  }
  ${override('Wax.CommentItemWrapper')}
`;

const CommentTitle = styled.span`
  font-weight: bold;
  font-size: ${th('fontSizeBase')};

  ${override('Wax.CommentItemTitle')}
`;

const More = styled.span`
  background: gray;
  border-radius: 3px;
  color: white;
  /* cursor: default; */
  display: inline-block;
  padding: 4px 8px;

  ${override('Wax.CommentMore')}
`;

const CommentItemList = props => {
  const { active, className, data, title } = props;
  if (!data || data.length === 0) return null;

  const [items, setItems] = useState(data);

  const context = useContext(WaxContext);
  const {
    pmViews: {
      main: {
        props: { users },
      },
    },
  } = context;

  useEffect(() => {
    if (!active) {
      const first = clone(data[0]);
      const threshold = 100; // after how many characters do you trunctate

      if (first.content.length > threshold) {
        first.content = `${first.content.substring(1, threshold)}...`;
      }

      setItems([first]);
    } else {
      setItems(data);
    }
  }, [active, data]);

  const displayName = id => users.find(user => user.userId === id);

  return (
    <Wrapper active={active} className={className}>
      {title && <CommentTitle>{title}</CommentTitle>}
      {items.map(item => (
        <CommentItem
          active={active}
          content={item.content}
          displayName={
            displayName(item.userId)?.displayName || item.displayName
          }
          key={uniqueId('comment-item-')}
          timestamp={item.timestamp}
        />
      ))}

      {!active && data.length > 1 && (
        <div>
          <More>{data.length - 1} more</More>
        </div>
      )}
    </Wrapper>
  );
};

CommentItemList.propTypes = {
  /** Whether this list belongs to the current active comment */
  active: PropTypes.bool,
  /** List of objects containing data for comment items */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      id: PropTypes.string,
      timestamp: PropTypes.number.isRequired,
    }),
  ),
  title: PropTypes.string,
};

CommentItemList.defaultProps = {
  active: false,
  data: [],
  title: null,
};

export default CommentItemList;
