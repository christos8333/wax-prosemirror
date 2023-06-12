import React, { useContext, useRef, useState } from 'react';
import { WaxContext, ComponentPlugin, Icon } from 'wax-prosemirror-core';
import styled from 'styled-components';
import ContainerEditor from './ContainerEditor';
import FeedbackComponent from '../../MultipleChoiceQuestionService/components/FeedbackComponent';

const FillTheGapContainer = styled.div`
  border: 3px solid #f5f5f7;
  margin-bottom: 30px;
`;

const FillTheGapContainerTool = styled.div`
  border: 3px solid #f5f5f7;
  border-bottom: none;

  span:first-of-type {
    position: relative;
    top: 3px;
  }
`;

const FillTheGapWrapper = styled.div`
  margin: 0px 38px 15px 38px;
  margin-top: 10px;
`;

const StyledIconContainer = styled.span`
  float: right;
`;

const StyledIconAction = styled(Icon)`
  position: relative;
  right: 4px;
  cursor: pointer;
  height: 24px;
  width: 24px;
`;

const InfoMsg = styled.div`
  background: #535e76;
  border-radius: 4px;
  bottom: 30px;
  color: #fff;
  display: none;
  float: right;
  left: 100px;
  padding-left: 4px;
  padding-right: 4px;
  position: relative;
`;

export default ({ node, view, getPos }) => {
  const context = useContext(WaxContext);
  const {
    pmViews: { main },
  } = context;

  const infoMsgRef = useRef();
  const [infoMsgIsOpen, setInfoMsgIsOpen] = useState(false);
  const FillTheGapTool = ComponentPlugin('fillTheGap');

  const customProps = main.props.customValues;
  const { testMode } = customProps;

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  const readOnly = !isEditable;
  const { feedback } = node.attrs;

  const displayInfoMsg = () => {
    if (infoMsgRef.current && !infoMsgIsOpen)
      infoMsgRef.current.style.display = 'inline';

    if (infoMsgRef.current && infoMsgIsOpen)
      infoMsgRef.current.style.display = 'none';

    setInfoMsgIsOpen(!infoMsgIsOpen);
  };

  return (
    <FillTheGapWrapper>
      <div>
        {/* <span> Fill The Gap</span> */}
        {!testMode && !readOnly && (
          <FillTheGapContainerTool>
            <FillTheGapTool />
            <StyledIconContainer
              onClick={displayInfoMsg}
              onKeyPress={() => {}}
              role="button"
              tabIndex={0}
            >
              <StyledIconAction name="help" />
            </StyledIconContainer>
            <InfoMsg ref={infoMsgRef}>
              enter answers seperated with a semi colon
            </InfoMsg>
          </FillTheGapContainerTool>
        )}
      </div>
      <FillTheGapContainer className="fill-the-gap">
        <ContainerEditor getPos={getPos} node={node} view={view} />

        {!testMode && !(readOnly && feedback === '') && (
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
