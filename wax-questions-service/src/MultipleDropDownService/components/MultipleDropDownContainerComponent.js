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

const MultipleDropDownpWrapper = styled.div`
  margin: 0px 38px 15px 38px;
  margin-top: 10px;
`;

const MultipleDropDownContainerTool = styled.div`
  border: 3px solid #f5f5f7;
  border-bottom: none;

  span {
    position: relative;
    top: 3px;
  }
`;

const MultipleDropDownpContainer = styled.div`
  border: 3px solid #f5f5f7;
  margin-bottom: 30px;
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

  const MultipleDropDown = ComponentPlugin('MultipleDropDown');

  const customProps = main.props.customValues;

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  const readOnly = !isEditable;
  const { testMode } = customProps;
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
    <MultipleDropDownpWrapper>
      <div>
        {/* <span>Multiple Drop Down</span> */}
        {!testMode && !readOnly && (
          <MultipleDropDownContainerTool>
            <MultipleDropDown />
            <ActionButton
              aria-label="delete this question"
              onClick={removeQuestion}
              type="button"
            >
              <StyledIconActionRemove name="deleteOutlinedQuestion" />
            </ActionButton>
          </MultipleDropDownContainerTool>
        )}
      </div>
      <MultipleDropDownpContainer className="multiple-drop-down">
        <ContainerEditor getPos={getPos} node={node} view={view} />
        {!testMode && !(readOnly && feedback === '') && (
          <FeedbackComponent
            getPos={getPos}
            node={getUpdatedNode()?.node}
            readOnly={readOnly}
            view={view}
          />
        )}
      </MultipleDropDownpContainer>
    </MultipleDropDownpWrapper>
  );
};

const getNodes = view => {
  const allNodes = DocumentHelpers.findBlockNodes(view.state.doc);
  const multipleDropContainerNodes = [];
  allNodes.forEach(node => {
    if (node.node.type.name === 'multiple_drop_down_container') {
      multipleDropContainerNodes.push(node);
    }
  });
  return multipleDropContainerNodes;
};
