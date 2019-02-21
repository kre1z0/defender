import React from "react";
import ReactDOM from "react-dom";

import Root from "./Root";

const render = Component => {
  ReactDOM.render(<Component />, document.getElementById("app"));
};

render(Root);
