import React from "react";
import Editor from "./Editor";

export default ({ notes, view }) => {
  return (
    <div>
      {notes.map(note => (
        <Editor node={note.node} pos={note.pos} view={view} />
      ))}
    </div>
  );
};
