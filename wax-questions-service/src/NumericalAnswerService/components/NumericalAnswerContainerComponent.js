import React, { useContext } from 'react';
import {
  WaxContext,
  ComponentPlugin,
  DocumentHelpers,
  Icon,
} from 'wax-prosemirror-core';
import styled from 'styled-components';
import ContainerEditor from './ContainerEditor';
import FeedbackComponent from '../../MultipleChoiceQuestionService/components/FeedbackComponent';

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

  span:first-of-type {
    position: relative;
    top: 3px;
  }
`;

const ActionButton = styled.button`
  background: transparent;
  cursor: pointer;
  margin-top: 16px;
  border: none;
  position: relative;
  bottom: 14px;
  left: -11px;
  float: right;
`;

const StyledIconActionRemove = styled(Icon)`
  height: 24px;
  width: 24px;
`;

export default ({ node, view, getPos }) => {
  const context = useContext(WaxContext);
  const {
    pmViews: { main },
  } = context;

  const FillTheGapTool = ComponentPlugin('fillTheGap');

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

  return (
    <NumericalAnswerWrapper>
      <div>
        {!testMode && !readOnly && (
          <NumericalAnswerContainerTool>
            <FillTheGapTool />
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
        <ContainerEditor getPos={getPos} node={node} view={view} />

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
