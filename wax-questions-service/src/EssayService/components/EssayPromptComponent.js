import React from 'react';
import EditorComponent from '../../MultipleChoiceQuestionService/components/EditorComponent';

export default ({ node, view, getPos }) => {
  return (
    <EditorComponent
      getPos={getPos}
      node={node}
      placeholderText="Provide response summary and rubric"
      QuestionType="EssayQuestion"
      view={view}
    />
  );
};
