import React, { useContext } from 'react';
import { WaxContext, DocumentHelpers, Icon } from 'wax-prosemirror-core';
import styled from 'styled-components';
import ContainerEditor from '../../../FillTheGapQuestionService/components/ContainerEditor';

const MultipleChoiceQuestionWrapper = styled.div`
  border: 3px solid #f5f5f7;
  margin: 0px 38px 15px 38px;
  margin-top: 10px;
`;
const MultipleChoiceContainerTool = styled.div`
  border-bottom: 3px solid #f5f5f7;
  height: 32px;
`;

const ActionButton = styled.button`
  background: transparent;
  cursor: pointer;
  margin-top: 16px;
  border: none;
  position: relative;
  bottom: 14px;
  left: 6px;
  float: right;
`;

const StyledIconActionRemove = styled(Icon)`
  height: 24px;
  width: 24px;
`;

const MultipleChoiceQuestionContainer = styled.div`
  border: 3px solid #f5f5f7;
  margin-bottom: 30px;
`;

export default ({ node, view, getPos }) => {
  const context = useContext(WaxContext);
  const {
    pmViews: { main },
  } = context;

  const customProps = main.props.customValues;
  const { testMode } = customProps;

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  const readOnly = !isEditable;

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
    <MultipleChoiceQuestionWrapper>
      <div>
        {!testMode && !readOnly && (
          <MultipleChoiceContainerTool>
            <ActionButton
              aria-label="delete this question"
              onClick={removeQuestion}
              type="button"
            >
              <StyledIconActionRemove name="deleteOutlinedQuestion" />
            </ActionButton>
          </MultipleChoiceContainerTool>
        )}
      </div>
      <MultipleChoiceQuestionContainer className="multiple-choice">
        <ContainerEditor
          disallowedTools={['MultipleChoice']}
          getPos={getPos}
          isNotEditable
          node={node}
          view={view}
        />
      </MultipleChoiceQuestionContainer>
    </MultipleChoiceQuestionWrapper>
  );
};

const getNodes = view => {
  const allNodes = DocumentHelpers.findBlockNodes(view.state.doc);
  const fillTheGapContainerNodes = [];
  allNodes.forEach(node => {
    if (node.node.type.name === 'multiple_choice_container') {
      fillTheGapContainerNodes.push(node);
    }
  });
  return fillTheGapContainerNodes;
};
