/* eslint-disable react/prop-types */
/* eslint-disable array-callback-return */
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { grid } from '@pubsweet/ui-toolkit';
import { DocumentHelpers } from 'wax-prosemirror-utilities';
import { WaxContext } from 'wax-prosemirror-core';
import MenuButton from '../../ui/buttons/MenuButton';
import Icon from '../../helpers/Icon';

const Wrapper = styled.div`
  background: #fff;
  border-radius: 1.03093% / 8%;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px 0px,
    rgba(9, 30, 66, 0.31) 0px 0px 1px 0px;
  font-size: 14px;
  padding: ${grid(2)};
  transform-origin: 50% 50% 0px;
  width: 200px;
`;

const TotalSuggestions = styled.div`
  color: #bdc2ca;
`;

const TotalComments = styled.div`
  color: #bdc2ca;
  padding-top: ${grid(2)};
`;

const ShowComments = styled.div`
  color: #bdc2ca;
  height: 23px;
  padding-top: ${grid(2)};

  svg {
    bottom: 12px;
    cursor: not-allowed;
    fill: #85adff;
    height: 45px !important;
    left: 62px;
    opacity: 0.6;
    position: relative;
    width: 45px !important;
  }
`;

const StyledToggleOn = styled(Icon)`
  cursor: pointer;
  height: 32px;
  margin-left: auto;
  width: 32px;
`;

const StyledIcon = styled(Icon)``;

const StyledIconExpand = styled(Icon)`
  bottom: 3px;
  left: 47px;
  position: relative;
`;

const ToolsContainer = styled.div`
  display: flex;
  flex-direction: column;

  button {
    padding-top: 6px;
    text-align: start;
  }

  svg {
    margin-top: 3px;
  }
`;

const AcceptRejectAll = styled.div`
  border-bottom: 1px solid #ebebf0;
  border-top: 1px solid #ebebf0;
  margin-top: 5px;
  padding: 2px 0px 2px 2px;
`;

const AcceptRejectAllButton = styled.div`
  background: none;
  border: none;
  cursor: pointer;
  padding-bottom: 3px;
  padding-top: 8px;
  text-align: start;
  width: 100%;

  &:hover {
    background: #f0f5ff;
  }
`;

const AcceptRejectAllControls = styled.div`
  background: #fff;
  border-radius: 1.03093% / 8%;
  bottom: 43px;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px 0px,
    rgba(9, 30, 66, 0.31) 0px 0px 1px 0px;
  font-size: 14px;
  padding: ${grid(2)};
  position: absolute;
  right: 207px;
  transform-origin: 50% 50% 0px;
  width: 200px;
`;

const AcceptRejectAllRow = styled.div`
  background: none;
  border: none;
  cursor: pointer;
  padding-bottom: 3px;
  padding-top: 8px;
  text-align: start;
  width: 100%;
  opacity: 0.4;
  cursor: not-allowed;
  &:hover {
    background: #f0f5ff;
  }

  svg {
    bottom: 2px;
    position: relative;
  }
`;

const getInlineTracks = main => {
  const marks = DocumentHelpers.findInlineNodes(main.state.doc);
  const commentsTracks = [];
  marks.map(node => {
    if (node.node.marks.length > 0) {
      node.node.marks.filter(mark => {
        if (
          mark.type.name === 'insertion' ||
          mark.type.name === 'deletion' ||
          mark.type.name === 'format_change'
        ) {
          commentsTracks.push(mark);
        }
      });
    }
  });
  return commentsTracks;
};

const getTrackBlockNodes = main => {
  const allBlockNodes = DocumentHelpers.findBlockNodes(main.state.doc);
  const trackBlockNodes = [];
  allBlockNodes.map(node => {
    if (node.node.attrs.track && node.node.attrs.track.length > 0) {
      trackBlockNodes.push(node);
    }
  });
  return trackBlockNodes;
};

const getComments = main => {
  const comments = DocumentHelpers.findChildrenByMark(
    main.state.doc,
    main.state.schema.marks.comment,
    true,
  );
  return comments;
};

const renderTools = menuItems => {
  const tools = [];
  tools.push(
    menuItems.map((menuItem, index) => {
      return (
        <MenuButton
          iconName={menuItem.icon}
          key={menuItem.name}
          label={menuItem.label}
        />
      );
    }),
  );
  return <>{tools}</>;
};

const TrackChangeOptionsComponent = ({ groups }) => {
  const [isShownTrack, setIsShownTrack] = useState(false);

  const menuItems = groups[0].items;
  const { view } = useContext(WaxContext);

  const inlineTracks = getInlineTracks(view.main).length;
  const blockTracks = getTrackBlockNodes(view.main).length;
  const comments = getComments(view.main).length;

  return (
    <Wrapper>
      <TotalSuggestions>
        {inlineTracks + blockTracks} SUGGESTIONS
      </TotalSuggestions>
      <ToolsContainer>{renderTools(menuItems)}</ToolsContainer>
      <AcceptRejectAll
        onMouseEnter={() => setIsShownTrack(true)}
        onMouseLeave={() => setIsShownTrack(false)}
      >
        <AcceptRejectAllButton>
          <StyledIcon name="acceptRejectTrack" />
          Accept/Reject All
          <StyledIconExpand name="navigateNext" />
        </AcceptRejectAllButton>
        {isShownTrack && (
          <AcceptRejectAllControls>
            <AcceptRejectAllRow>
              <StyledIcon name="checkTrack" />
              Accept All
            </AcceptRejectAllRow>
            <AcceptRejectAllRow>
              <StyledIcon name="close" />
              Reject All
            </AcceptRejectAllRow>
          </AcceptRejectAllControls>
        )}
      </AcceptRejectAll>
      <TotalComments>{comments} COMMENTS</TotalComments>
      <ShowComments>
        Show comments
        <StyledToggleOn name="toggleOn" />
      </ShowComments>
    </Wrapper>
  );
};

export default TrackChangeOptionsComponent;
