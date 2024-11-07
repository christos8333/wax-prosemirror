/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import styled from 'styled-components';
import { each, isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { grid } from '@pubsweet/ui-toolkit';
import {
  WaxContext,
  ApplicationContext,
  DocumentHelpers,
  MenuButton,
  Commands,
} from 'wax-prosemirror-core';

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
  text-transform: uppercase;
`;

// const TotalComments = styled.div`
//   color: #bdc2ca;
//   padding-top: ${grid(2)};
// `;

// const ShowComments = styled.div`
//   color: #bdc2ca;
//   display: flex;
//   flex-direction: row;
//   height: 25px;
//   padding-top: ${grid(2)};

//   svg {
//     bottom: 14px;
//     cursor: not-allowed;
//     fill: #85adff;
//     height: 45px !important;
//     opacity: 0.6;
//     position: relative;
//     width: 45px !important;
//   }
// `;

// const StyledToggleOn = styled(Icon)`
//   cursor: pointer;
//   height: 32px;
//   margin-left: auto;
//   width: 32px;
// `;

// const StyledIcon = styled(Icon)``;

// const StyledIconExpand = styled(Icon)`
//   bottom: 3px;
//   margin-left: auto;
//   position: relative;
// `;

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

// const AcceptRejectAll = styled.div`
//   border-bottom: 1px solid #ebebf0;
//   border-top: 1px solid #ebebf0;
//   margin-top: 5px;
//   padding: 2px 0px 2px 2px;
// `;

// const AcceptRejectAllButton = styled.div`
//   background: none;
//   border: none;
//   cursor: pointer;
//   display: flex;
//   flex-direction: row;
//   padding-bottom: 3px;
//   padding-top: 8px;
//   text-align: start;
//   width: 100%;

//   &:hover {
//     background: #f0f5ff;
//   }
// `;

// const AcceptRejectAllControls = styled.div`
//   background: #fff;
//   border-radius: 1.03093% / 8%;
//   bottom: 43px;
//   box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px 0px,
//     rgba(9, 30, 66, 0.31) 0px 0px 1px 0px;
//   font-size: 14px;
//   padding: ${grid(2)};
//   position: absolute;
//   right: 190px;
//   transform-origin: 50% 50% 0px;
//   width: 209px;
//   z-index: 9999;
// `;

// const AcceptRejectAllRow = styled.div`
//   background: none;
//   border: none;
//   padding-bottom: 3px;
//   padding-top: 8px;
//   text-align: start;
//   width: 100%;
//   opacity: 0.4;
//   cursor: not-allowed;
//   &:hover {
//     background: #f0f5ff;
//   }

//   svg {
//     bottom: 2px;
//     position: relative;
//   }
// `;

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

// const getComments = main => {
//   const comments = [];
//   const commentsNodes = DocumentHelpers.findChildrenByMark(
//     main.state.doc,
//     main.state.schema.marks.comment,
//     true,
//   );
//   commentsNodes.map(node => {
//     if (node.node.marks.length > 0) {
//       node.node.marks.filter(mark => {
//         if (mark.type.name === 'comment') {
//           comments.push(mark);
//         }
//       });
//     }
//   });
//   return [...new Set(comments.map(item => item.attrs.id))];
// };

const TrackChangeOptionsComponent = ({
  groups,
  setShowHidden,
  showHiddenValue,
}) => {
  // const [isShownTrack, setIsShownTrack] = useState(false);
  const { t, i18n } = useTranslation();
  const menuItems = groups[0].items;
  const { pmViews, activeView, activeViewId } = useContext(WaxContext);
  const { app } = useContext(ApplicationContext);
  const { state } = activeView;
  const user = app.config.get('user');
  const hideShowPlugin = app.PmPlugins.get('hideShowPlugin');
  const inlineTracks = getInlineTracks(pmViews.main).length;
  const blockTracks = getTrackBlockNodes(pmViews.main).length;
  // const comments = getComments(pmViews.main).length;

  const renderTools = () => {
    const tools = [];
    tools.push(
      menuItems.map(menuItem => {
        const isActive = !!(
          menuItem.active(state, activeViewId) &&
          menuItem.select(state, activeViewId)
        );
        let label =
          !isEmpty(i18n) && i18n.exists(`Wax.TrackChanges.${menuItem.label}`)
            ? t(`Wax.TrackChanges.${menuItem.label}`)
            : menuItem.label;
        if (menuItem.name === 'ShowHideTrackChange' && showHiddenValue) {
          label =
            !isEmpty(i18n) && i18n.exists(`Wax.TrackChanges.Hide suggestions`)
              ? t(`Wax.TrackChanges.Hide suggestions`)
              : 'Hide suggestions';
        }

        const isDisabled = !menuItem.select(state, activeViewId, activeView);
        return (
          <MenuButton
            active={isActive || false}
            disabled={isDisabled}
            iconName={menuItem.icon}
            key={menuItem.name}
            label={label}
            onMouseDown={e => {
              e.preventDefault();
              if (menuItem.name === 'ShowHideTrackChange') {
                setShowHidden(!showHiddenValue);
                hideShowPlugin.props.setHideShow(showHiddenValue);
                each(pmViews, singleView => {
                  singleView.dispatch(singleView.state.tr);
                });
                return false;
              }
              Commands.simulateKey(activeView, 66, 'Caps-Lock');
              return menuItem.run(activeView.state, activeView.dispatch, user);
            }}
          />
        );
      }),
    );
    return <>{tools}</>;
  };

  return (
    <Wrapper>
      <TotalSuggestions>
        {inlineTracks + blockTracks}{' '}
        {!isEmpty(i18n) && i18n.exists(`Wax.TrackChanges.Suggestions`)
          ? t(`Wax.TrackChanges.Suggestions`)
          : 'Suggestions'}
      </TotalSuggestions>
      <ToolsContainer>{renderTools()}</ToolsContainer>
      {/* <AcceptRejectAll
        onMouseEnter={() => setIsShownTrack(true)}
        onMouseLeave={() => setIsShownTrack(false)}
      >
        <AcceptRejectAllButton>
          <StyledIcon name="acceptRejectTrack" />
          <span>Accept/Reject All</span>
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
      </AcceptRejectAll> */}
      {/* <TotalComments>{comments} COMMENTS</TotalComments>
      <ShowComments>
        <span>Show comments</span>
        <StyledToggleOn name="toggleOn" />
      </ShowComments> */}
    </Wrapper>
  );
};

export default TrackChangeOptionsComponent;
