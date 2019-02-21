import React from "react";
import styled from "styled-components";
import { darkTheme, ThemeProvider } from "@evergis/ui";

export const ControlsContainer = styled("div")`
  position: absolute;
  display: flex;
  height: 40px;
  bottom: 20px;
  left: 20px;
  z-index: 4;
`;

export const Controls = ({ children }) => (
  <ThemeProvider theme={darkTheme}>
    <ControlsContainer>{children}</ControlsContainer>
  </ThemeProvider>
);
