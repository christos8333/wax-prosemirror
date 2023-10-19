import React from 'react';
// import ReactDOM from 'react-dom/client';
import ReactDOM from 'react-dom';
import Editors from './Editors';
import * as serviceWorker from './serviceWorker';
import '../../../wax-prosemirror-core/dist/index.css';
import '../../../wax-prosemirror-services/dist/index.css';
import '../../../wax-questions-service/dist/index.css';
import '../../../wax-table-service/dist/index.css';
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<Editors />);

ReactDOM.render(<Editors />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
