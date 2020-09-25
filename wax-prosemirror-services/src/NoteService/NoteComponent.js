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

  const cleanUpNoteViews = () => {
    if (view) {
      const currentNotes = DocumentHelpers.findChildrenByType(
        main.state.doc,
        main.state.schema.nodes.footnote,
        true,
      );
      if (notes.length > currentNotes.length) {
        // TODO remove from context views that no loger exist
        // console.log('to do cleanup');
      }
    }
  };

  useDeepCompareEffect(() => {
    setNotes(updateNotes(main));
    cleanUpNoteViews();
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
