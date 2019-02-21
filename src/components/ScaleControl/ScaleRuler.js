import React from "react";

import { ScaleRulerContainer, ScaleRulerBlock } from "./styled";

const minLength = 50;

const getScale = scale => {
  const scales = [1, 2, 5];
  for (let i = 0; i < 21; i++) {
    for (let j = 0; j < scales.length; j++) {
      let result = Math.pow(10, i) * scales[j];
      if (result > scale) {
        return result;
      }
    }
  }
};

export const ScaleRuler = ({ resolution }) => {
  const minScale = minLength * resolution;
  const currentScale = getScale(minScale);
  const width = currentScale / resolution;

  return (
    <ScaleRulerContainer>
      <ScaleRulerBlock width={width}>
        {currentScale >= 1000 ? currentScale / 1000 + "km" : currentScale + "m"}
      </ScaleRulerBlock>
    </ScaleRulerContainer>
  );
};
