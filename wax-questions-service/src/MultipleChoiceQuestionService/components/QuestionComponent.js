import React, { useContext } from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import EditorComponent from './EditorComponent';

export default ({ node, view, getPos }) => {
  const context = useContext(WaxContext);
  const {
    pmViews: { main },
  } = context;

  const customProps = main.props.customValues;
  const { testMode } = customProps;

  const isEditable = main.props.editable(editable => {
    return editable;
  });

  return (
    <EditorComponent
      getPos={getPos}
      node={node}
      showDelete={!testMode && isEditable}
      view={view}
    />
  );
};
