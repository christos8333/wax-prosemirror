/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import { Icon } from 'wax-prosemirror-components';
import styled from 'styled-components';
import FeedbackComponent from './FeedbackComponent';

const MatchingContainer = styled.div`
  border: 3px solid #f5f5f7;
  margin-bottom: 30px;
`;

const MatchingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ;
  margin: 0px 38px 15px 38px;
  margin-top: 10px;
`;

const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const LeftArea = styled.div`
  display: flex;
`;
const RightArea = styled.div`
  display: flex;
`;
const CreateOptions = styled.div`
  display: flex;
  margin-top: 10px;
  border: 1px solid black;
`;

const ActionButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const StyledIconAction = styled(Icon)`
  height: 24px;
  width: 24px;
`;

const OptionArea = styled.div`
  display: flex;
`;

const AddOption = styled.div`
  display: flex;
`;

export default ({ node, view, getPos }) => {
  const context = useContext(WaxContext);
  const {
    pmViews: { main },
  } = context;

  const customProps = main.props.customValues;

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  const readOnly = !isEditable;

  const addOption = () => {};

  return (
    <MatchingWrapper>
      <span>Matching</span>
      <MatchingContainer className="matching">
        <QuestionWrapper>
          <LeftArea>
            <input type="text"></input>
            {!readOnly && (
              <ActionButton
                onClick={() => addOption(node.attrs.id)}
                type="button"
              >
                <StyledIconAction name="plusSquare" />
              </ActionButton>
            )}
          </LeftArea>
          <RightArea>Right</RightArea>
        </QuestionWrapper>
        <QuestionWrapper>
          <LeftArea>
            <input type="text"></input>
          </LeftArea>
          <RightArea>Right</RightArea>
        </QuestionWrapper>
        <CreateOptions>
          <OptionArea>Options Area</OptionArea>
          <AddOption>
            <input type="text"></input>
          </AddOption>
        </CreateOptions>
        {!(readOnly && !customProps.showFeedBack) && (
          <FeedbackComponent
            getPos={getPos}
            node={node}
            readOnly={readOnly}
            view={view}
          />
        )}
      </MatchingContainer>
    </MatchingWrapper>
  );
};
