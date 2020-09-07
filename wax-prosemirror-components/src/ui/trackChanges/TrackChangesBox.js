import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import icons from '../../icons/icons';

const { check, times } = icons;

const activeBorder = css`
  border-color: gray;
`;

const Wrapper = styled.div`
  border: 2px solid transparent;
  border-radius: 5px;
  cursor: pointer;
  padding: 8px 16px;
  transition: border 0.1s ease-in;

  ${props => props.active && activeBorder}

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
  font-color: gray;
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
  padding: 4px;
  width: 16px;
  height: 16px;
  transition: background 0.1s ease-in;

  &:hover {
    background: gray;
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
    displayName,
    label,
    onClick,
    onClickAccept,
    onClickReject,
    text,
    timestamp,
  } = props;

  return (
    <Wrapper active={active} onClick={onClick} className={className}>
      {active && (
        <HeadWrapper>
          <Info>
            <Name>{displayName}</Name>
            <Timestamp>{timestamp}</Timestamp>
          </Info>

          <Tools>
            <IconButton icon={check} onClick={onClickAccept} />
            <IconButton icon={times} onClick={onClickReject} />
          </Tools>
        </HeadWrapper>
      )}

      <ChangeWrapper>
        <Label>{label}</Label>
        <Text>{text}</Text>
      </ChangeWrapper>
    </Wrapper>
  );
};

TrackChangesBox.propTypes = {
  active: PropTypes.bool,
  displayName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClickAccept: PropTypes.func.isRequired,
  onClickReject: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
};

TrackChangesBox.defaultProps = {
  active: false,
};

export default TrackChangesBox;
