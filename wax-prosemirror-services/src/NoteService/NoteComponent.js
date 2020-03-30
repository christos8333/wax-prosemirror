import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
  Fragment
} from "react";
import { WaxContext } from "wax-prosemirror-core/src/ioc-react";
import { DocumentHelpers } from "wax-prosemirror-utilities";
import { isEqual } from "lodash";
import NoteEditor from "./NoteEditor";

export default () => {
  const { view: { main } } = useContext(WaxContext);
  const [notes, setNotes] = useState([]);
  useEffect(
    () => {
      setNotes(updateNotes(main));
    },

    [JSON.stringify(updateNotes(main))]
  );

  const noteComponent = useMemo(
    () => <NoteEditor notes={notes} view={main} />,
    [notes]
  );
  return <Fragment>{noteComponent}</Fragment>;
};
const updateNotes = view => {
  if (view) {
    return DocumentHelpers.findChildrenByType(
      view.state.doc,
      view.state.schema.nodes.footnote,
      true
    );
  }
  return [];
};
