import React, { Component } from "react";
import styled from "styled-components";
import { injectGlobal } from "styled-components";
import { injectGlobals, ThemeProvider, GlobalsContainer as GlobalsContainerUI, darkTheme } from "@evergis/ui";

import { Map } from "./Map/Map";

injectGlobal`
  html, body, #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
`;

export const GlobalsContainer = styled(GlobalsContainerUI)`
  width: 100%;
  height: 100%;
  letter-spacing: 0.1px;
  * {
    box-sizing: border-box;
  }
`;

injectGlobals({ iconFont: true });

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={darkTheme}>
        <GlobalsContainer>
          <Map />
        </GlobalsContainer>
      </ThemeProvider>
    );
  }
}

export default App;
