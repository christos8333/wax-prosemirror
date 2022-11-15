/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { WaxContext, ComponentPlugin } from 'wax-prosemirror-core';
import styled from 'styled-components';
import ContainerEditor from './ContainerEditor';
import FeedbackComponent from './FeedbackComponent';

const MultipleDropDownpWrapper = styled.div`
  margin: 0px 38px 15px 38px;
  margin-top: 10px;
`;

const MultipleDropDownContainerTool = styled.div`
  background: #f5f5f7;
  span {
    position: relative;
    left: 5px;
    top: 3px;
  }
`;

const MultipleDropDownpContainer = styled.div`
  border: 3px solid #f5f5f7;
  margin-bottom: 30px;
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

  return (
    <MultipleDropDownpWrapper>
      <div>
        <span>Multiple Drop Down</span>
        <MultipleDropDownContainerTool>
          <span> Insert Drop Down :</span>
          <MultipleDropDown />
        </MultipleDropDownContainerTool>
      </div>
      <MultipleDropDownpContainer className="multiple-drop-down">
        <ContainerEditor getPos={getPos} node={node} view={view} />
        {!testMode && (
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
