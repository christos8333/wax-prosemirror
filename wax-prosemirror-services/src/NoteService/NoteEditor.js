import React, { Fragment } from "react";
import Editor from "./Editor";

export default ({ notes, view }) => {
  return (
    <Fragment>
      {notes.map(note => (
        <Editor key={note.node.attrs.id} node={note.node} view={view} />
      ))}
    </Fragment>
  );
};
