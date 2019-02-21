import React from "react";
import { IconButton } from "@evergis/ui";

import { ScaleRuler } from "./ScaleRuler";
import { ScaleControlContainer, ZoomLvl } from "./styled";

export const ScaleControl = ({ onZoom, resolution }) => {
  return (
    <ScaleControlContainer>
      <IconButton kind={"plus"} onClick={() => onZoom(1)} />
      <IconButton kind={"minus"} onClick={() => onZoom(-1)} />
      <ZoomLvl>{10 || 0}</ZoomLvl>
      <ScaleRuler resolution={resolution} />
    </ScaleControlContainer>
  );
};
