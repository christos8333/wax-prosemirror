/* eslint react/prop-types: 0 */
import React from 'react';
import styled, { css } from 'styled-components';
import DateParser from '../../helpers/DateParser';

import icons from '../../icons/icons';

const { check, times } = icons;

const activeBorder = css`
  border-color: #bfc4cd;
`;

const Wrapper = styled.div`
  background: #f5f5f5;
  border: 2px solid transparent;
  border-radius: 5px;
  cursor: pointer;
  ${props => props.active && activeBorder}
  padding: 8px 16px;
  transition: border 0.1s ease-in;

  &:hover {
    ${activeBorder}
  }
`;

const HeadWrapper = styled.div`
  display: flex;
  margin-bottom: 8px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Name = styled.div``;

const Timestamp = styled.div`
  color: gray;
`;

const Tools = styled.div``;

const ChangeWrapper = styled.div``;

const Label = styled.span`
  font-weight: bold;
  margin-right: 4px;
  text-transform: capitalize;

  &:after {
    content: ':';
  }
`;

const Text = styled.span``;

const Icon = styled.div`
  border-radius: 3px;
  display: inline-block;
  height: 16px;
  padding: 4px;
  transition: background 0.1s ease-in;
  width: 16px;

  &:hover {
    background: #bfc4cd;
  }
`;

const IconButton = props => {
  // eslint-disable-next-line react/prop-types
  const { icon, onClick } = props;

  const handleClick = e => {
    e.stopPropagation();
    onClick();
  };

  return (
    <Icon onClick={handleClick} type="button">
      {icon}
    </Icon>
  );
};

const TrackChangesBox = props => {
  const {
    active,
    className,
    label,
    onClickBox,
    onClickAccept,
    onClickReject,
    text,
    trackData,
  } = props;

  const onClickTrackBox = () => {
    onClickBox(trackData);
  };

  const username = trackData.attrs
    ? trackData.attrs.username
    : trackData.node.attrs.track[0].username;

  const date = trackData.attrs
    ? trackData.attrs.date
    : trackData.node.attrs.track[0].date;

  return (
    <Wrapper active={active} className={className} onClick={onClickTrackBox}>
      <HeadWrapper>
        <Info>
          <Name>{username}</Name>
          <Timestamp>
            <DateParser timestamp={date}>
              {(timeStamp, timeAgo) => {
                return `${timeAgo} ago`;
              }}
            </DateParser>
          </Timestamp>
        </Info>
        {active && (
          <Tools>
            <IconButton icon={check} onClick={onClickAccept} />
            <IconButton icon={times} onClick={onClickReject} />
          </Tools>
        )}
      </HeadWrapper>

      <ChangeWrapper>
        <Label>{label}</Label>
        <Text>{text}</Text>
      </ChangeWrapper>
    </Wrapper>
  );
};

export default TrackChangesBox;
