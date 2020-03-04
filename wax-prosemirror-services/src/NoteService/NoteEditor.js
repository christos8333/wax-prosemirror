import React, { useMemo } from "react";
import Editor from "./Editor";

export default ({ notes, view }) => {
  return (
    <div>
      {notes.map(note => (
        <Editor
          key={note.node.attrs.id}
          node={note.node}
          pos={note.pos}
          view={view}
        />
      ))}
    </div>
  );
};
