import React from 'react';
import EditorComponent from '../../MultipleChoiceQuestionService/components/EditorComponent';

export default ({ node, view, getPos }) => {
  return (
    <EditorComponent
      getPos={getPos}
      node={node}
      placeholderText="Type your essay item"
      QuestionType="EssayQuestion"
      view={view}
    />
  );
};
