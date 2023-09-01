import React from 'react';
// import ReactDOM from 'react-dom/client';
import ReactDOM from 'react-dom';
import Editors from './Editors';
import * as serviceWorker from './serviceWorker';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<Editors />);

ReactDOM.render(<Editors />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
