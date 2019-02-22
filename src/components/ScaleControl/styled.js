import styled from "styled-components";

import { Blank } from "../../components/Atoms/Blank";

export const ScaleControlContainer = styled(Blank)`
  width: 224px;
  margin-right: 10px;
  padding: 0 15px 0 5px;
  align-items: center;
  height: 100%;
`;

export const ZoomLvl = styled("div")`
  font-weight: 500;
  padding: 0 14px 0 10px;
`;

export const ScaleRulerContainer = styled("div")`
  margin: auto auto 14px auto;
`;

export const ScaleRulerBlock = styled("div")`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: ${({ width }) => `${width}px`};
  height: 0.25rem;
  border: 0.0625rem solid white;
  border-top: 0;
  font-size: 12px;
`;
