import React, { useContext }  from 'react';
import { WaxContext } from 'wax-prosemirror-core';
import {isEmpty} from 'lodash';
import ReactDOM from 'react-dom';
import { v4 as uuidv4 } from 'uuid';
import TestComponent from './TestComponent';

export default () => {
    const { activeView } = useContext(WaxContext);

    // useEffect(() => {
    //   const editorViewDOM = editorViewRef.current;
    //   if (editorViewDOM) {
    //     createEditorView(editorViewDOM);
    //   }
    // }, [createEditorView]);

    //
    
    if (isEmpty(activeView)) return null

    if (!activeView.state.multipleChoicePlugin$.dom) return null

    return ReactDOM.createPortal(<TestComponent />, document.getElementById('portalId'), uuidv4())
  };