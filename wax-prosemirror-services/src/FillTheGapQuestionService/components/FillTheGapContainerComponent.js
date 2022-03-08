/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import styled from 'styled-components';
import ContainerEditor from './ContainerEditor';
import FeedbackComponent from './FeedbackComponent';

const FillTheGapContainer = styled.div`
  border: 3px solid #f5f5f7;
  margin-bottom: 30px;
`;

const FillTheGapWrapper = styled.div`
  margin-bottom: ;
  margin: 0px 38px 15px 38px;

  margin-top: 10px;
`;

export default ({ node, view, getPos }) => {
  const context = useContext(WaxContext);
  const {
    view: { main },
  } = context;

  const customProps = context.view.main.props.customValues;

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  const readOnly = !isEditable;

  return (
    <FillTheGapWrapper>
      <span>Fill The Gap</span>
      <FillTheGapContainer className="fill-the-gap">
        <ContainerEditor getPos={getPos} node={node} view={view} />
        {!(readOnly && !customProps.showFeedBack) && (
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
