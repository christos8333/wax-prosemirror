/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import styled from 'styled-components';
import ContainerEditor from './ContainerEditor';
import FeedbackComponent from './FeedbackComponent';

const MultipleDropDownpContainer = styled.div`
  border: 3px solid #f5f5f7;
  margin-bottom: 30px;
`;

const MultipleDropDownpWrapper = styled.div`
  margin-bottom: ;
  margin: 0px 38px 15px 38px;

  margin-top: 10px;
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

  return (
    <MultipleDropDownpWrapper>
      <span>Multiple Drop Down</span>
      <MultipleDropDownpContainer className="multiple-drop-down">
        <ContainerEditor getPos={getPos} node={node} view={view} />
        {!(readOnly && customProps && !customProps.showFeedBack) && (
          <FeedbackComponent
            getPos={getPos}
            node={node}
            readOnly={readOnly}
            view={view}
          />
        )}
      </MultipleDropDownpContainer>
    </MultipleDropDownpWrapper>
  );
};
