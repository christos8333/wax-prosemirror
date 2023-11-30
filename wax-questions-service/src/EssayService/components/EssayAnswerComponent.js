import React, { useContext } from 'react';
import styled from 'styled-components';
import { WaxContext } from 'wax-prosemirror-core';
import EditorComponent from '../../MultipleChoiceQuestionService/components/EditorComponent';

const EditorWrapper = styled.div`
  display: ${props =>
    props.testMode || props.showFeedBack ? 'block' : 'none'};
`;

export default ({ node, view, getPos }) => {
  const context = useContext(WaxContext);
  const {
    pmViews: { main },
  } = context;
  const customProps = main.props.customValues;

  const { testMode, showFeedBack } = customProps;

  return (
    <EditorWrapper showFeedBack={showFeedBack} testMode={testMode}>
      <EditorComponent
        forceEditable={testMode}
        getPos={getPos}
        node={node}
        placeholderText="Type your essay answer"
        QuestionType="EssayQuestion"
        view={view}
      />
    </EditorWrapper>
  );
};
