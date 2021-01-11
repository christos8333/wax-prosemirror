import React, { useContext } from 'react';
import styled from 'styled-components';
import { grid } from '@pubsweet/ui-toolkit';
import { DocumentHelpers } from 'wax-prosemirror-utilities';
import { WaxContext } from 'wax-prosemirror-core';
import Icon from '../../helpers/Icon';

const Wrapper = styled.div`
  background: #fff;
  border-radius: 1.03093% / 8%;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px 0px,
    rgba(9, 30, 66, 0.31) 0px 0px 1px 0px;
  padding: ${grid(2)};
  transform-origin: 50% 50% 0px;
  width: 200px;
  height: 200px;
`;

const TotalSuggestions = styled.span`
  color: #bdc2ca;
  font-size: 14px;
`;

const TotalComments = styled.span`
  color: #bdc2ca;
  font-size: 14px;
`;

const ShowComments = styled.div`
  color: #bdc2ca;
  font-size: 14px;

  svg {
    cursor: not-allowed;
    fill: #85adff;
    opacity: 0.6;
    width: 50px !important;
    height: 50px !important;
  }
`;

const StyledToggleOn = styled(Icon)`
  cursor: pointer;
  height: 32px;
  margin-left: auto;
  width: 32px;
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
          mark.pos = node.pos;
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

const TrackChangeOptionsComponent = ({ groups }) => {
  console.log(groups);
  const { app, view, activeViewId } = useContext(WaxContext);

  const inlineTracks = getInlineTracks(view.main).length;
  const blockTracks = getTrackBlockNodes(view.main).length;
  const comments = getComments(view.main).length;

  return (
    <Wrapper>
      <TotalSuggestions>
        {inlineTracks + blockTracks} SUGGESTIONS
      </TotalSuggestions>
      <div>-----</div>
      <TotalComments>{comments} COMMENTS</TotalComments>
      <ShowComments>
        Show comments
        <StyledToggleOn name="toggleOn" />
      </ShowComments>
    </Wrapper>
  );
};

export default TrackChangeOptionsComponent;
