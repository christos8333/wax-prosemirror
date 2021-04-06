import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { schema } from 'prosemirror-schema-basic';

const styles = {
  backgroundColor: 'red',
  width: '200px',
  height: '200px',
};

const onChange = () => {};

export default () => {
  const editorViewRef = useRef(null);
  const handleChange = useCallback(onChange, []);
  const state = useMemo(() => {
    const doc = schema.nodeFromJSON({
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: ' ',
            },
          ],
        },
      ],
    });
    return EditorState.create({
      doc,
      plugins: [
        // history(),
        // keymap({ 'Mod-z': undo, 'Mod-y': redo }),
        // keymap(baseKeymap),
      ],
    });
  }, []);
  const createEditorView = useCallback(
    editorViewDOM => {
      const view = new EditorView(editorViewDOM, {
        state,

        dispatchTransaction(transaction) {
          const newState = view.state.apply(transaction);
          handleChange(newState.doc.toJSON());
          view.updateState(newState);
        },
      });
    },
    [state, handleChange],
  );

  // useEffect(() => {
  //   const editorViewDOM = editorViewRef.current;
  //   if (editorViewDOM) {
  //     createEditorView(editorViewDOM);
  //   }
  // }, [createEditorView]);

  return <div style={styles}></div>;
};
