import React from "react";
import ReactDOM from "react-dom";

import App from "./containers/App";

export const rootId = "app";

const render = Component => {
  ReactDOM.render(<Component />, document.getElementById(rootId));
};

render(App);
