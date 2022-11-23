import React, { useContext } from 'react';
import { WaxContext, ComponentPlugin } from 'wax-prosemirror-core';
import styled from 'styled-components';
import ContainerEditor from './ContainerEditor';
import FeedbackComponent from '../../MatchingService/components/FeedbackComponent';

const FillTheGapContainer = styled.div`
  border: 3px solid #f5f5f7;
  margin-bottom: 30px;
`;

const FillTheGapContainerTool = styled.div`
  border: 3px solid #f5f5f7;
  border-bottom: none;

  span {
    position: relative;
    top: 3px;
  }
`;

const FillTheGapWrapper = styled.div`
  margin: 0px 38px 15px 38px;
  margin-top: 10px;
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

  return (
    <FillTheGapWrapper>
      <div>
        <span> Fill The Gap</span>
        {!testMode && !readOnly && (
          <FillTheGapContainerTool>
            <FillTheGapTool />
          </FillTheGapContainerTool>
        )}
      </div>
      <FillTheGapContainer className="fill-the-gap">
        <ContainerEditor getPos={getPos} node={node} view={view} />

        {!testMode && (
          <FeedbackComponent
            getPos={getPos}
            node={node}
            readOnly={readOnly}
            view={view}
          />
        )}
      </FillTheGapContainer>
    </FillTheGapWrapper>
  );
};
