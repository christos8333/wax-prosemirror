import React from 'react';


const styles = {
  backgroundColor: 'red',
  width: '200px',
  height: '200px',
};

export default () => {


  // useEffect(() => {
  //   const editorViewDOM = editorViewRef.current;
  //   if (editorViewDOM) {
  //     createEditorView(editorViewDOM);
  //   }
  // }, [createEditorView]);

  return <div style={styles}></div>;
};
