import React, { useContext } from 'react';
import styled from 'styled-components';
import { WaxContext } from 'wax-prosemirror-core';
import EditorComponent from '../../MultipleChoiceQuestionService/components/EditorComponent';

const EditorWrapper = styled.div`
  display: ${props => (props.testMode ? 'none' : 'block')};
`;

export default ({ node, view, getPos }) => {
  const context = useContext(WaxContext);
  const {
    pmViews: { main },
  } = context;
  const customProps = main.props.customValues;

  const { testMode } = customProps;

  return (
    <EditorWrapper testMode={testMode}>
      <EditorComponent
        getPos={getPos}
        node={node}
        placeholderText="Provide response summary and rubric"
        QuestionType="EssayQuestion"
        view={view}
      />
    </EditorWrapper>
  );
};
