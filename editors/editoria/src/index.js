import React from "react";
import ReactDOM from "react-dom";
import Editoria from "./Editoria";
import * as serviceWorker from "./serviceWorker";
const { whyDidYouUpdate } = require("why-did-you-update");
whyDidYouUpdate(React);
ReactDOM.render(<Editoria />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
