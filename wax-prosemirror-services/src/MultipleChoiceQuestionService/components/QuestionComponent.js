import React from 'react';
import QuestionEditorComponent from './QuestionEditorComponent';

export default ({ node, view, getPos }) => {
  return <QuestionEditorComponent getPos={getPos} node={node} view={view} />;
};
