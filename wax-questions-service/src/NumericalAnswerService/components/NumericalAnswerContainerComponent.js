import React, { useContext, useEffect, useState } from 'react';
import { WaxContext, DocumentHelpers, Icon } from 'wax-prosemirror-core';
import styled from 'styled-components';
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
  span:first-of-type {
    position: relative;
    top: 3px;
  }
`;

const NumericalAnswerOption = styled.div`
  padding: 8px;
`;

const ActionButton = styled.button`
  background: transparent;
  cursor: pointer;
  margin-top: 16px;
  border: none;
  position: relative;
  margin-left: auto;
  bottom: 13px;
`;

const StyledIconActionRemove = styled(Icon)`
  height: 24px;
  width: 24px;
`;

export default ({ node, view, getPos }) => {
  const context = useContext(WaxContext);
  const {
    options,
    pmViews: { main },
    setOption,
  } = context;

  const customProps = main.props.customValues;
  const { testMode } = customProps;

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

  useEffect(() => {
    setOption({
      [node.attrs.id]: { numericalAnswer: node.attrs.answerType },
    });
  }, []);

  return (
    <NumericalAnswerWrapper>
      <div>
        {!testMode && !readOnly && (
          <NumericalAnswerContainerTool>
            <NumericalAnswerDropDownCompontent nodeId={node.attrs.id} />
            <ActionButton
              aria-label="delete this question"
              onClick={removeQuestion}
              type="button"
            >
              <StyledIconActionRemove name="deleteOutlinedQuestion" />
            </ActionButton>
          </NumericalAnswerContainerTool>
        )}
      </div>
      <NumericalAnswerContainer className="numerical-answer">
        <EditorComponent
          getPos={getPos}
          node={node}
          type="NumericalAnswer"
          view={view}
        />
        <NumericalAnswerOption>
          {options[node.attrs.id]?.numericalAnswer === '' && (
            <>No Type Selected</>
          )}
          {options[node.attrs.id]?.numericalAnswer === 'exactAnswer' && (
            <ExactAnswerComponent node={node} />
          )}
          {options[node.attrs.id]?.numericalAnswer === 'rangeAnswer' && (
            <RangeAnswerComponent node={node} />
          )}
          {options[node.attrs.id]?.numericalAnswer === 'preciseAnswer' && (
            <PreciseAnswerComponent node={node} />
          )}
        </NumericalAnswerOption>
        {!testMode && !(readOnly && feedback === '') && (
          <FeedbackComponent
            getPos={getPos}
            node={node}
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
