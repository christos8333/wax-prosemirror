/* eslint react/prop-types: 0 */
import React, { useContext, useState, useMemo } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { differenceBy } from 'lodash';
import { WaxContext, DocumentHelpers } from 'wax-prosemirror-core';
import NoteEditor from './NoteEditor';

export default ({ view }) => {
  const context = useContext(WaxContext);
  if (typeof view === 'undefined') return null;

  const {
    pmViews: { main },
  } = context;

  const {
    state: { tr },
  } = main;

  const [notes, setNotes] = useState([]);
  const cleanUpNoteViews = () => {
    if (main) {
      const currentNotes = DocumentHelpers.findChildrenByType(
        main.state.doc,
        main.state.schema.nodes.footnote,
        true,
      );
      if (notes.length > currentNotes.length) {
        const difference = differenceBy(notes, currentNotes, 'node.attrs.id');
        difference.forEach((item, i) => {
          context.removeView(item.node.attrs.id);
        });

        tr.setMeta('notesChanged', true);
        main.dispatch(tr);

        // const newView = Object.keys(view).reduce((object, key) => {
        //   if (key !== difference[0].node.attrs.id) {
        //     object[key] = view[key];
        //   }
        //   return object;
        // }, {});
      }
    }
  };

  useDeepCompareEffect(() => {
    setNotes(updateNotes(context.pmViews.main));
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
