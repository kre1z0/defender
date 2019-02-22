import React from "react";

import { GridLegendContainer, ColorsContainer, ColorItem, LabelsContainer, Label } from "./styled";

const colors = [" #89b24b", "#72a324", "#48881b", "#325624", "rgba(112, 42, 2, 0.65)"];

export const GridLegend = ({ isVisible }) => (
  <GridLegendContainer isVisible={isVisible}>
    <ColorsContainer>
      {colors.map((color, index) => (
        <ColorItem key={`${color}-${index}`} color={color} />
      ))}
    </ColorsContainer>
    <LabelsContainer>
      <Label>меньше объектов</Label>
      <Label>больше объектов</Label>
    </LabelsContainer>
  </GridLegendContainer>
);
