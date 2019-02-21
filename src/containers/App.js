import React, { Component } from "react";
import { injectGlobal } from "styled-components";
import { injectGlobals, ThemeProvider, GlobalsContainer as GlobalsContainerUI } from "@evergis/ui";
import styled from "styled-components";

import { Map } from "./Map/Map";

injectGlobal`
  html, body, #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`;

export const GlobalsContainer = styled(GlobalsContainerUI)`
  width: 100%;
  height: 100%;
`;

injectGlobals({ iconFont: true });

class App extends Component {
  render() {
    return (
      <ThemeProvider>
        <GlobalsContainer>
          <Map />
        </GlobalsContainer>
      </ThemeProvider>
    );
  }
}

export default App;
