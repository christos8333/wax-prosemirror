import React, { useContext, useState, useMemo } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

import { WaxContext } from 'wax-prosemirror-core';
import { DocumentHelpers } from 'wax-prosemirror-utilities';
import NoteEditor from './NoteEditor';

export default () => {
  const {
    view,
    view: { main },
  } = useContext(WaxContext);

  const [notes, setNotes] = useState([]);

  const getUpdateNotes = () => {
    if (view) {
      console.log(view, notes);
      const allNotes = DocumentHelpers.findChildrenByType(
        main.state.doc,
        main.state.schema.nodes.footnote,
        true,
      );
      console.log(allNotes);
    }
  };

  useDeepCompareEffect(() => {
    setNotes(updateNotes(main));
    getUpdateNotes();
  }, [updateNotes(main)]);

  const noteComponent = useMemo(
    () => <NoteEditor notes={notes} view={main} />,
    [notes],
  );
  return <>{noteComponent}</>;
};
const updateNotes = view => {
  if (view) {
    return DocumentHelpers.findChildrenByType(
      view.state.doc,
      view.state.schema.nodes.footnote,
      true,
    );
  }
  return [];
};
