import React, { useContext, useEffect, useRef, useState, useMemo } from 'react';
import styled from 'styled-components';
import { th } from '@pubsweet/ui-toolkit';
import { WaxContext, DocumentHelpers, Icon } from 'wax-prosemirror-core';
import EditorComponent from '../../MultipleChoiceQuestionService/components/EditorComponent';
import FeedbackComponent from '../../MultipleChoiceQuestionService/components/FeedbackComponent';
import NumericalAnswerDropDownCompontent from './NumericalAnswerDropDownCompontent';
import ExactAnswerComponent from './ExactAnswerComponent';
import PreciseAnswerComponent from './PreciseAnswerComponent';
import RangeAnswerComponent from './RangeAnswerComponent';

const NumericalAnswerWrapper = styled.div`
  margin: 0px 38px 15px 38px;
  margin-top: 10px;
`;

const NumericalAnswerContainer = styled.div`
  border: 3px solid #f5f5f7;
  margin-bottom: 30px;
`;

const NumericalAnswerContainerTool = styled.div`
  border: 3px solid #f5f5f7;
  border-bottom: none;
  height: 33px;
  display: flex;
  flex-direction: row;
`;

const NumericalAnswerOption = styled.div`
  padding: 8px;
`;

const ActionButton = styled.button`
  background: transparent;
  cursor: pointer;
  border: none;
  margin-left: auto;
  z-index: 999;
`;

const StyledIconContainer = styled.span`
  float: right;
  position: relative;
  top: 3px;
`;

const StyledIconAction = styled(Icon)`
  position: relative;
  right: 4px;
  cursor: pointer;
  height: 24px;
  width: 24px;
  z-index: 999;
`;

const InfoMsg = styled.div`
  color: #fff;
  display: none;
  user-select: none;
  position: absolute;
  width: 100%;
  span {
    background: ${th('colorPrimary')};
    bottom: 35px;
    border-radius: 4px;
    float: right;
    right: 162px;
    padding: 4px;
    position: relative;
  }
`;

const StyledIconActionRemove = styled(Icon)`
  height: 24px;
  width: 24px;
`;

export default ({ node, view, getPos }) => {
  const context = useContext(WaxContext);
  const {
    // options,
    pmViews: { main },
    setOption,
  } = context;

  const customProps = main.props.customValues;

  const { testMode, showFeedBack } = customProps;
  const infoMsgRef = useRef();
  const [infoMsgIsOpen, setInfoMsgIsOpen] = useState(false);

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  const readOnly = !isEditable;
  const { feedback } = node.attrs;

  const removeQuestion = () => {
    const allNodes = getNodes(context.pmViews.main);
    allNodes.forEach(singleNode => {
      if (singleNode.node.attrs.id === node.attrs.id) {
        context.pmViews.main.dispatch(
          context.pmViews.main.state.tr.delete(
            singleNode.pos,
            singleNode.pos + singleNode.node.nodeSize,
          ),
        );
      }
    });
  };

  // useEffect(() => {
  //   setOption({
  //     [getUpdatedNode().node.attrs.id]: {
  //       numericalAnswer: node.attrs.answerType,
  //     },
  //   });
  // }, []);

  const displayInfoMsg = () => {
    if (infoMsgRef.current && !infoMsgIsOpen)
      infoMsgRef.current.style.display = 'block';

    if (infoMsgRef.current && infoMsgIsOpen)
      infoMsgRef.current.style.display = 'none';

    setInfoMsgIsOpen(!infoMsgIsOpen);
  };

  const getUpdatedNode = () => {
    let nodeFound = node;
    const allNodes = getNodes(context.pmViews.main);
    allNodes.forEach(singNode => {
      if (singNode.node.attrs.id === node.attrs.id) {
        nodeFound = singNode;
      }
    });
    return nodeFound;
  };

  return (
    <NumericalAnswerWrapper>
      <div>
        {!testMode && !readOnly && (
          <NumericalAnswerContainerTool>
            <NumericalAnswerDropDownCompontent node={node} />
            <ActionButton
              aria-label="delete this question"
              onClick={removeQuestion}
              type="button"
            >
              <StyledIconActionRemove name="deleteOutlinedQuestion" />
            </ActionButton>
            {getUpdatedNode()?.node?.attrs?.answerType === 'preciseAnswer' && (
              <StyledIconContainer
                onClick={displayInfoMsg}
                onKeyPress={() => {}}
                role="button"
                tabIndex={0}
              >
                <StyledIconAction name="help" />
              </StyledIconContainer>
            )}

            <InfoMsg ref={infoMsgRef}>
              <span>Separate answer variants with a semi colon</span>
            </InfoMsg>
          </NumericalAnswerContainerTool>
        )}
      </div>
      <NumericalAnswerContainer className="numerical-answer">
        <EditorComponent
          getPos={getPos}
          node={getUpdatedNode()?.node}
          QuestionType="NumericalAnswer"
          view={view}
        />
        <NumericalAnswerOption>
          {getUpdatedNode()?.node?.attrs?.answerType === '' && (
            <>No Type Selected</>
          )}
          {getUpdatedNode()?.node?.attrs?.answerType === 'exactAnswer' && (
            <ExactAnswerComponent
              node={getUpdatedNode()?.node}
              readOnly={readOnly}
              showFeedBack={showFeedBack}
              testMode={testMode}
            />
          )}
          {getUpdatedNode()?.node?.attrs?.answerType === 'rangeAnswer' && (
            <RangeAnswerComponent
              node={getUpdatedNode()?.node}
              readOnly={readOnly}
              showFeedBack={showFeedBack}
              testMode={testMode}
            />
          )}
          {getUpdatedNode()?.node?.attrs?.answerType === 'preciseAnswer' && (
            <PreciseAnswerComponent
              node={getUpdatedNode()?.node}
              readOnly={readOnly}
              showFeedBack={showFeedBack}
              testMode={testMode}
            />
          )}
        </NumericalAnswerOption>
        {!testMode && !(readOnly && feedback === '') && (
          <FeedbackComponent
            getPos={getPos}
            node={getUpdatedNode()?.node}
            readOnly={readOnly}
            view={view}
          />
        )}
      </NumericalAnswerContainer>
    </NumericalAnswerWrapper>
  );
};

const getNodes = view => {
  const allNodes = DocumentHelpers.findBlockNodes(view.state.doc);
  const numericalAnswerpContainerNodes = [];
  allNodes.forEach(node => {
    if (node.node.type.name === 'numerical_answer_container') {
      numericalAnswerpContainerNodes.push(node);
    }
  });
  return numericalAnswerpContainerNodes;
};
